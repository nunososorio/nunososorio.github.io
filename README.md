## DocuMatch

DocuMatch is a Streamlit app that analyzes the similarity between uploaded Word files.

## Live Tool

You can access the live tool at https://nunososorio-nunososorio-github-io-app-5lxxp6.streamlit.app/

## Requirements

To run this app locally, you will need to install the following libraries:
- streamlit
- matplotlib
- networkx
- python-docx
- scikit-learn
- pandas

## Usage

To use the app, upload two or more Word files. The app will analyze the similarity between the files and display the results.
When you upload two or more Word files to DocuMatch, the app will analyze their content and display a list of pairs of files that are considered similar based on a predefined similarity threshold. The default threshold is 0.9.
In addition to the list of similar files, DocuMatch also displays a heatmap showing the similarity scores between all pairs of uploaded files. This allows you to quickly see which files are most similar to each other and how they are related.

## Potential Use Cases

DocuMatch can be used in a variety of scenarios where it is necessary to compare the content of multiple Word documents. Some potential use cases include:
- Organizing documents: DocuMatch can be used to group similar documents together, making it easier to organize and manage large collections of files.
- Finding duplicate content: DocuMatch can be used by content creators or editors to find and remove duplicate content from a large collection of documents.
- Detecting plagiarism: DocuMatch can be used by teachers to compare student assignments and detect potential cases of plagiarism.

## Advantages

DocuMatch advantages include:
- Simplicity: DocuMatch is easy to use, with a simple and intuitive interface that allows you to quickly upload and compare multiple Word files.
- Speed: DocuMatch is fast, using efficient algorithms to quickly analyze and compare large batches of files.
- Accuracy: DocuMatch uses advanced algorithms such as TF-IDF and cosine similarity to accurately measure the similarity between different files.

## Additional Information
When using the live tool, the uploaded files are temporarily stored on the server while the app is processing them. Once the analysis is complete and the results are displayed, the files are removed from the server.
The speed of the tool in comparing large batches of files is due to the efficient algorithms used by the app:
- The TF-IDF algorithm assigns a weight to each word in the document based on its importance, allowing the app to accurately measure the similarity between different files without having to compare every single word.
- The cosine similarity metric used by the app is a fast and effective way to compare the similarity between pairs of documents.

## License
Copyright (c) 2023 Nuno S. Osório
