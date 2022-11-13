from flask import Flask, jsonify

from Summarizer import Summarizer
from Classifier import Classifier


news_labels = ['stock market', 'finance', 'economy', 'science', 'politics', 'real estate', 'energy price', 'technology']
app = Flask(__name__, static_folder=None)


@app.route("/api/query")
def query():
    return jsonify(
        response=True
    )


@app.route("/api/classifier/general/<device>/<text>")
def classify_general(device, text):
    newsClassifier = Classifier(device=device)
    results = newsClassifier.classifyGeneral(text, news_labels, multiLabel=True)
    return str(results)


@app.route("/api/classifier/binary/<device>/<label>/<text>")
def classify_binary(device, label, text):
    newsClassifier = Classifier(device=device)
    results = newsClassifier.classifyBinary(text, label)
    return str(results)


@app.route("/api/summarizer/<device>/<text>")
def summarize(device, text):
    newSummarizer = Summarizer(device=device)
    return newSummarizer.summarize(text)


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=4000)