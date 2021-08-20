+++
# Experience widget.
widget = "experience"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 30  # Order that this section will appear.

title = "Experience"
subtitle = ""

# Date format for experience
#   Refer to https://sourcethemes.com/academic/docs/customization/#date-format
date_format = "Jan 2006"

# Experiences.
#   Add/remove as many `[[experience]]` blocks below as you like.
#   Required fields are `title`, `company`, and `date_start`.
#   Leave `date_end` empty if it's your current employer.
#   Begin/end multi-line descriptions with 3 quotes `"""`.

[[experience]]
  title = "Senior Software Engineer"
  company = "Alteryx Innovation Labs"
  company_url = "https://www.alteryx.com/innovation-labs"
  location = "Boston, MA"
  date_start = "2020-06-01"
  date_end = ""
  description = """\n

  **Technical Leadership:** Led the planning and implementation of several key features of [EvalML](https://github.com/alteryx/evalml), a python package for automated machine learning (AutoML). These include [parallel computation](https://evalml.alteryx.com/en/stable/user_guide/automl.html#Parallel-AutoML) of machine learning pipelines, time series modelling, and explaining predictions of black-box models with [SHAP](https://evalml.alteryx.com/en/stable/user_guide/model_understanding.html#Explaining-Predictions).

  **Building an Open Source Community:** Actively review proposed changes and answer questions from the open source users of EvalML. To date, this amounts to reviewing 500 Pull Requests in the year in since I joined as well as filing 150 issues for bugs and improvements. Primary creator and maintainer of EvalML's [conda package](https://anaconda.org/conda-forge/evalml), which is the primary way open source users can install our package on Windows.

  **DevOps:** Sped up EvalML's CI testing by a factor of 5 (50 minutes to 10 minutes) by speeding up the 100 slowest tests that contributed to 98% of the total runtime and by reconfiguring our GitHub Actions testing pipeline to run tests in parallel. Also created a per-commit build and test of our conda package to identify regressions before new versions of EvalML are released. 
  """

[[experience]]
  title = "Software Engineer"
  company = "Aptiv Autonomous Mobility"
  company_url = "https://www.aptiv.com/autonomous-mobility"
  location = "Boston, MA"
  date_start = "2018-08-01"
  date_end = "2020-06-01"
  description = """\n

  **Data Engineering:** Wrote software library for efficiently training deep learning models on 60 hours (200 GB) of log data collected from autonomous vehicles. Engineered a data pipeline for parsing data from vehicle logs, preprocessing data, and storing in MongoDB database. Use of my software was instrumental in releasing [CoverNet](https://arxiv.org/pdf/1911.10298.pdf), a novel deep learning algorithm for predicting trajectories of vehicles with 40% improvement over state of the art.
  
  **Deep Learning Research:** Researched convolutional neural network architectures for predicting future trajectories of vehicles from log data collected from out fleet of autonomous vehicles.
  
  **MapManager:** Developed a python package for efficiently manipulating map data without consuming all the available RAM. With this package, it is possible to train deep learning models that require map data on datasets that don't fit in memory.

  **LaneTarget Estimator:** Developed a Random Forest model for predicting the lane a vehicle will take in an intersection. Showed 11% improvement in performance over the existing method.
  """

[[experience]]
  title = "Emerging Technologist - Data Science Track"
  company = "Nielsen"
  company_url = "https://www.nielsen.com/us/en/"
  location = "Chicago, IL"
  date_start = "2016-07-01"
  date_end = "2018-07-01"
  description = """

  **Television Station Clusters:** Used t-SNE and K-Means algorithm to create television station clusters for use in Nielsen ratings calculations. Use of these clusters improves ratings accuracy by 8%. Created an interactive dashboard in Shiny to visualize clusters and present to clients.

  **Household Demographic Prediction:** Helped develop a Recurrent Neural Network to predict household demographics based on cable set-top box data. Researched how to correct model predictions to match census estimates with mixed integer programming. Productionalized model training code to scale to millions of homes.

  **DVD Sales Prediction:** Analyzed DVD sales data and developed a random forest model to predict future sales within 15% relative error. Designed an interface with R Shiny to allow stakeholders to make predictions.

  """

+++
