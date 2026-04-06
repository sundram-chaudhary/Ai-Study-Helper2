import { useState } from "react";

const styles = `
  :root {
    font-family: "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background: #f8fafc;
    line-height: 1.5;
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%);
    color: #0f172a;
  }

  .app-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .app-card {
    width: 100%;
    max-width: 760px;
    background: #ffffffcc;
    backdrop-filter: blur(8px);
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
    padding: 28px;
    animation: fadeUp 420ms ease-out;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .logo {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 700;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
  }

  .title-wrap h1 {
    margin: 0;
    font-size: 1.35rem;
    letter-spacing: 0.2px;
  }

  .title-wrap p {
    margin: 2px 0 0;
    color: #64748b;
    font-size: 0.95rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    margin-top: 18px;
  }

  .topic-input {
    border: 1px solid #cbd5e1;
    background: #fff;
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 1rem;
    outline: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }

  .topic-input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }

  .generate-btn,
  .copy-btn {
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0 18px;
    height: 50px;
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.25);
  }

  .generate-btn:hover,
  .copy-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.3);
  }

  .generate-btn:active,
  .copy-btn:active {
    transform: translateY(0);
  }

  .generate-btn:disabled,
  .copy-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .status {
    margin-top: 14px;
    min-height: 22px;
    color: #475569;
    font-size: 0.95rem;
  }

  .result-card {
    margin-top: 18px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    padding: 18px;
    animation: fadeIn 360ms ease-out;
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .result-header h2 {
    margin: 0;
    font-size: 1rem;
    color: #1e293b;
  }

  .copy-btn {
    height: 38px;
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 0 14px;
  }

  .result-text {
    margin: 0;
    color: #334155;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.7;
  }

  .result-content {
    display: grid;
    gap: 8px;
  }

  .result-section-title {
    margin: 10px 0 2px;
    font-size: 1rem;
    color: #0f172a;
    font-weight: 700;
  }

  .result-line {
    margin: 0;
    color: #334155;
    line-height: 1.7;
  }

  .result-gap {
    height: 6px;
  }

  .result-number-row {
    display: grid;
    grid-template-columns: 28px 1fr;
    align-items: start;
    gap: 10px;
    margin: 2px 0;
  }

  .result-number-badge {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    font-weight: 700;
    color: #1d4ed8;
    background: #dbeafe;
    border: 1px solid #bfdbfe;
    margin-top: 2px;
  }

  .result-bullet-row {
    display: grid;
    grid-template-columns: 16px 1fr;
    align-items: start;
    gap: 8px;
  }

  .result-bullet-dot {
    color: #6366f1;
    font-weight: 700;
    margin-top: 2px;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .app-card {
      padding: 20px;
      border-radius: 16px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .generate-btn {
      width: 100%;
    }
  }
`;

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyState, setCopyState] = useState("Copy");

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setResult("");
    setCopyState("Copy");

    try {
      const response = await fetch("http://localhost:5500/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const output =
        typeof data === "string"
          ? data
          : data.result || data.response || data.message || JSON.stringify(data, null, 2);

      setResult(output || "No response returned.");
    } catch (error) {
      setResult(`Unable to generate study content right now.\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopyState("Copied!");
      setTimeout(() => setCopyState("Copy"), 1400);
    } catch {
      setCopyState("Failed");
      setTimeout(() => setCopyState("Copy"), 1400);
    }
  };

  const formatInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }
      return <span key={`${part}-${index}`}>{part}</span>;
    });
  };

  const renderResultContent = (text) => {
    const lines = text.split("\n");

    return lines.map((rawLine, index) => {
      const line = rawLine.trim();

      if (!line) {
        return <div className="result-gap" key={`gap-${index}`} />;
      }

      const sectionMatch = line.match(/^\*\*(.+?)\*\*\s*:?$/);
      if (sectionMatch) {
        return (
          <h3 className="result-section-title" key={`section-${index}`}>
            {formatInline(sectionMatch[1])}
          </h3>
        );
      }

      const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
      if (numberedMatch) {
        return (
          <div className="result-number-row" key={`num-${index}`}>
            <span className="result-number-badge">{numberedMatch[1]}</span>
            <p className="result-line">{formatInline(numberedMatch[2])}</p>
          </div>
        );
      }

      const bulletMatch = line.match(/^[-*]\s+(.+)$/);
      if (bulletMatch) {
        return (
          <div className="result-bullet-row" key={`bullet-${index}`}>
            <span className="result-bullet-dot">•</span>
            <p className="result-line">{formatInline(bulletMatch[1])}</p>
          </div>
        );
      }

      return (
        <p className="result-line" key={`line-${index}`}>
          {formatInline(line)}
        </p>
      );
    });
  };

  return (
    <>
      <style>{styles}</style>
      <main className="app-shell">
        <section className="app-card">
          <div className="header">
            <div className="logo">AI</div>
            <div className="title-wrap">
              <h1>AI Study Helper</h1>
              <p>Generate clean, structured notes for any topic instantly.</p>
            </div>
          </div>

          <div className="form-row">
            <input
              className="topic-input"
              type="text"
              placeholder="Enter a topic (e.g., photosynthesis, World War II)"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleGenerate();
                }
              }}
            />
            <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          <p className="status">{loading ? "Thinking and preparing your notes..." : ""}</p>

          {result && (
            <article className="result-card">
              <div className="result-header">
                <h2>Generated Result</h2>
                <button className="copy-btn" onClick={handleCopy} disabled={loading}>
                  {copyState}
                </button>
              </div>
              <div className="result-text result-content">{renderResultContent(result)}</div>
            </article>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
