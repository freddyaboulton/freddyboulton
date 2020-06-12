---
title: "Motion Prediction using Trajectory Sets and Self-Driving Domain Knowledge"
authors:
- admin
- Elena Corina Grigore
- Eric M. Wolff
date: "2020-06-08T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2020-06-08T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
publication: ""
publication_short: ""

abstract: Predicting the future motion of vehicles has been studied using various techniques, including stochastic policies, generative models, and regression. Recent work has shown that classification over a trajectory set, which approximates possible motions, achieves state-of-the-art performance and avoids issues like mode collapse. However, map information and the physical relationships between nearby trajectories is not fully exploited in this formulation. We build on classification-based approaches to motion prediction by adding an auxiliary loss that penalizes off-road predictions. This auxiliary loss can easily be pretrained using only map information (e.g., off-road area), which significantly improves performance on small datasets. We also investigate weighted cross-entropy losses to capture spatial-temporal relationships among trajectories. Our final contribution is a detailed comparison of classification and ordinal regression on two public self-driving datasets.

# Summary. An optional shortened abstract.
summary: We extend CoverNet with novel loss functions to better capture geometric relationships in the trajectory set.

tags:
- Source Themes
featured: false

links:
- name: arXiv
  url: https://arxiv.org/abs/2006.04767
url_pdf: https://arxiv.org/pdf/2006.04767.pdf
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
