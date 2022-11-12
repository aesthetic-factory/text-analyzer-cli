from Classifier import Classifier

newsClassifier = Classifier(device="cpu")

inputs ="""Twitter staff have started to post online that they believe they have lost their jobs, ahead of an announcement by the company later on Friday.
The social media giant says it will inform its staff whether they are still employed after Elon Musk's takeover.
Employees are tweeting using the hashtag #LoveWhereYouWorked and a saluting emoji to say they are leaving.
Yash Agarwal, who worked in public policy, said it was "the greatest privilege ever" to work for Twitter.
In an internal email, the social media company said the cuts are "an effort to place Twitter on a healthy path".
The firm added that its offices would be temporarily closed, with staff unable to enter the building until they know if they have lost their jobs.
The multi-billionaire will be Twitter's chief executive after buying the firm last week in a $44bn (£39.3bn) deal.
"We will go through the difficult process of reducing our global workforce on Friday," Twitter said in the email.
"We recognise this will impact a number of individuals who have made valuable contributions to Twitter, but this action is unfortunately necessary to ensure the company's success moving forward," it added.
The company said office access would be immediately limited "to help ensure the safety of each employee as well as Twitter systems and customer data".
All staff are set to receive an email with the subject "Your Role at Twitter" by 09:00 Pacific time (16:00 GMT) on Friday.
Workers who are not affected will be notified through their company email, according to Twitter.
Meanwhile, those who are affected will be told of the "next steps" through their personal accounts.
"Given the nature of our distributed workforce and our desire to inform impacted individuals as quickly as possible, communications for this process will take place via email," Twitter said.
BBC News
"""
# https://www.bbc.com/news/technology-63495125

newslabels = ['stock market', 'finance', 'economy', 'science', 'politics', 'real estate', 'energy price', 'technology']
print(newsClassifier.classifierGeneral(inputs, newslabels, multiLabel=True))


binary_labels = ['economy','stock market']
directional_labels = ['inflation','interest rate']
