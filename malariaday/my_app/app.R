library(shiny)
library(leaflet)
library(shinyjs)
library(readxl)
library(tidyverse)

# Download the xlsx file from the URL
temp <- tempfile(fileext = ".xlsx")
download.file("https://github.com/nunososorio/nunososorio.github.io/raw/main/malariaday/is_endemic.xlsx", temp, mode = "wb")

# Load the downloaded xlsx file
endemic <- read_excel(temp)

# Define UI for application
ui <- fluidPage(
  titlePanel("Descobre os Países Endémicos de Malária:"),
  leafletOutput("map"),
  useShinyjs(),
  p("PEvoGEn, ICVS"),
  div(id = "feedback", style = "font-weight: bold; color: green;"),
  div(id = "feedback2", style = "font-weight: bold; color: blue;")
)

# Define server logic
server <- function(input, output) {
  # Render Leaflet map
  output$map <- renderLeaflet({
    leaflet() %>%
      addTiles() %>%
      setView(lng = 0, lat = 0, zoom = 2)
  })
  
  # Create a reactive value for selected country
  selected_country <- reactiveVal(NULL)
  correct_guesses <- reactiveVal(0)
  
  # Observe clicks on the map
  observeEvent(input$map_click, {
    click <- input$map_click
    clicked_country <- endemic[round(endemic$lat) == round(click$lat),]
    
    if (any(clicked_country$region %in% endemic[round(endemic$lng) == round(click$lng),]$region)) {
      correct_guesses(correct_guesses() + 1)
      selected_country("Correto!")
    } else {
      selected_country("Incorreto")
    }
    
    shinyjs::html("feedback", selected_country())
    shinyjs::show("feedback")
    shinyjs::html("feedback2", paste("Clicks corretos:", correct_guesses()))
    shinyjs::show("feedback2")
  })
}

# Run the application
shinyApp(ui = ui, server = server)
