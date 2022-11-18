import { React, useState } from 'react';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const AnalyzeArticle = () => {
    const [notification, setNotification] = useState(undefined);
    const [response, setResponse] = useState(undefined);

    const {
        device,
        setDevice,
        analyze,
        setAnalyze,
        label,
        setLabel,
        article,
        setArticle,
    } = useArticleAnalysis({ });

    const handleAnalyze = (event) => {
        event.preventDefault();
        setNotification(null);
        
        if (analyze != null && device != null) {
            if (analyze == 'summarizer') {
                SummarizeArticle({ article, device });
            } else {
                if (label != null) {
                    ClassifyArticle({ device, article });
                } else {
                    ClassifyArticleWithLabel({ device, label, article });
                }
            }
        }    
    };

    async function SummarizeArticle({ device, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `${article}`})
        }
        setResponse(
            fetch(`${SERVER_HOST}/api/summarizer/${device}`, requestOptions)
            .then(response => response.json())
            .then(result => result['summary'])
            .then(result => console.log(result))
            .catch(error => JSON.stringify({ error: error}))
            );
    }
    
    async function ClassifyArticleWithLabel({ device, label, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `article` })
        }
        fetch(`${SERVER_HOST}/api/classifier/binary/${device}/${label}`, requestOptions)
        .then(response => response.json())
        .then(result => result['classification'])
        .then(result => console.log(result))
        .catch(error => JSON.stringify({ error: error}));
    }
    
    async function ClassifyArticle({ device, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `${article}` })
        }
        setResponse(
            fetch(`${SERVER_HOST}/api/classifier/general/${device}`, requestOptions)
            .then(response => response.json())
            .then(result => result['classification'])
            .then(result => console.log(result))
            .catch(error => JSON.stringify({ error: error}))
            );
    }

    const handleChange = (event) => {
        console.log(response);
        event.target.value = response;
    }

    return (
        <>
            <div className='analyze-form-container'>
                <form onSubmit={handleAnalyze}>
                    <h2>Paste an article for analyzing to summarize</h2>
                    <div></div>
                    <table className="analyze-form-tbl">
                        <tbody>
                            <tr>
                                <td>
                                    Choose device:
                                    <select id="device" name="device" onChange={(event) => setDevice(event.target.value)}>
                                        <option value="cuda">CUDA</option>
                                        <option value="cpu">CPU</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Choose analysis method:
                                    <select id="analyzeMethod" name="analyzeMethod" onChange={(event) => setAnalyze(event.target.value)}>
                                        <option value="summarizer">Summarizer</option>
                                        <option value="classifier">Classifier</option>
                                    </select>
                                </td>
                            </tr>
                            <tr id="classifyLabelInput">
                                <td>
                                    Label:
                                    <input type="text" id="classifyLabel" onChange={(event) => setLabel(event.target.value)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Article:</td>
                            </tr>
                            <tr>
                                <td><textarea name="article" onChange={(event) => setArticle(event.target.value)}  rows={10} cols={80} /></td>
                            </tr>
                            <tr>
                                <td><button type="submit" className="submit">Analyze</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )

}

export const useArticleAnalysis = ({ defaults }) => {
    const [device, setDevice] = useState(defaults?.device ? defaults.device : 'cuda');
    const [analyze, setAnalyze] = useState(defaults?.device ? defaults.device : 'summarizer');
    const [label, setLabel] = useState(defaults?.device ? defaults.device : 'economy');
    const [article, setArticle] = useState(defaults?.device ? defaults.device : 'sample article');

    return {
        device,
        setDevice,
        analyze,
        setAnalyze,
        label,
        setLabel,
        article,
        setArticle,
    }
}

export default AnalyzeArticle;