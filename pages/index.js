import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import buildspaceLogo from "../assets/buildspace-logo.png"

const Home = () => {
    const [userInput, setUserInput] = useState("")
    const [apiOutput, setApiOutput] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const onUserChangedText = (event) => {
        setUserInput(event.target.value)
    }

    const callGenerateEndpoint = async () => {
        setIsGenerating(true)

        console.log("Calling OpenAI...")
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        })

        const data = await response.json()
        const { output } = data
        console.log("OpenAI replied...", output.text)

        setApiOutput(`${output.text}`)
        setIsGenerating(false)
    }

    return (
        <div className="root">
            <Head>
                <title>GPT-3 Writer | buildspace</title>
            </Head>
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>
                            Develop your
                            <span style={{ color: "rgb(255, 79, 18)" }}> Music </span> Composing
                            Idea
                        </h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>
                            Write what your song is going to be about and what genre you want to
                            start the magic.
                        </h2>
                        <h3>
                            You can also write if you want it to sound like an artist, a specific
                            key signature, or an instrument you like
                        </h3>
                    </div>
                </div>
                <div className="prompt-container">
                    <textarea
                        placeholder="A pop song for a heartbreak, like Imagine Dragons beats"
                        className="prompt-box"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <div className="prompt-buttons">
                        <a
                            className={isGenerating ? "generate-button loading" : "generate-button"}
                            onClick={callGenerateEndpoint}
                        >
                            <div className="generate">
                                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                            </div>
                        </a>
                    </div>
                    {apiOutput && (
                        <div className="output">
                            <div className="output-header-container">
                                <div className="output-header">
                                    <h3>Output</h3>
                                </div>
                            </div>
                            <div className="output-content">
                                <p>{apiOutput}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="badge-container grow">
                <a href="https://buildspace.so/builds/ai-writer" target="_blank" rel="noreferrer">
                    <div className="badge">
                        <Image src={buildspaceLogo} alt="buildspace logo" />
                        <p>build with buildspace</p>
                    </div>
                </a>
            </div> */}
        </div>
    )
}

export default Home
