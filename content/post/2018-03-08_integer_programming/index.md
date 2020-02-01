+++
title = "Integer Programming Tutorial"

date = 2018-03-18
lastmod = 2020-02-01
draft = false

authors = ["Freddy Alfonso Boulton"]

tags = []

summary = "Using python to solve optimization problems."

projects = []

# Featured image
# To use, add an image named `featured.jpg/png` to your project's folder. 
[image]
  # Caption (optional)
  caption = ""

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"

  # Show image only in page previews?
  preview_only = false

+++

While working at Nielsen, I was tasked with making the predictions of a machine learning model align with census estimates of a group of demographics in a region interest. Unlike most traditional optimization problems, where the answers can be real numbers, in this situation the answer is a yes or no (whether a certain individual belongs to a demographic group). The right tool for the job is integer programming. I summarize what I learned about this field, and how to use it in practice, [here](https://towardsdatascience.com/integer-programming-in-python-1cbdfa240df2). 