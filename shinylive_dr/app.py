
# Import necessary libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.datasets import make_s_curve
from sklearn.manifold import TSNE
from mpl_toolkits.mplot3d import Axes3D
import random

# Function to generate a random number within a range
def random_n(min_value=0, max_value=1000):
    return random.randint(min_value, max_value)

# Create a 3D dataset
X, color = make_s_curve(n_samples=1000)

# Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Apply t-SNE
tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(X)

# Points for the GREEN line
green_pointC = random_n()
green_pointD = random_n()

# Calculate the absolute difference between all color values
color_diffs = np.abs(color[:, None] - color)

# Set the diagonal to a large value to ignore self-differences
np.fill_diagonal(color_diffs, np.inf)

# Find the indices of the two points with the smallest color difference
red_pointA, red_pointB = np.unravel_index(np.argmin(color_diffs), color_diffs.shape)

# Plot the results
fig, axs = plt.subplots(3, 1, figsize=(10, 50))

# Original Data
axs[0] = fig.add_subplot(411, projection='3d')
axs[0].scatter(X[:, 0], X[:, 1], X[:, 2], c=color)
axs[0].plot(*zip(X[green_pointC], X[green_pointD]), color='green', label='Green line')  
axs[0].plot(*zip(X[red_pointA], X[red_pointB]), color='red', label='Red line')  
axs[0].set_title('Original Data')

# PCA
axs[1] = fig.add_subplot(412)
axs[1].scatter(X_pca[:, 0], X_pca[:, 1], c=color)
axs[1].plot(*zip(X_pca[green_pointC], X_pca[green_pointD]), color='green')  
axs[1].plot(*zip(X_pca[red_pointA], X_pca[red_pointB]), color='red')  
axs[1].set_title('PCA')

# t-SNE
axs[2] = fig.add_subplot(413)
axs[2].scatter(X_tsne[:, 0], X_tsne[:, 1], c=color)
axs[2].plot(*zip(X_tsne[green_pointC], X_tsne[green_pointD]), color='green')  
axs[2].plot(*zip(X_tsne[red_pointA], X_tsne[red_pointB]), color='red')  
axs[2].set_title('t-SNE')

plt.tight_layout()
plt.show()