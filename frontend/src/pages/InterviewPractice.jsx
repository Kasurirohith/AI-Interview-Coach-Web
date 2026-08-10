import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://ai-interview-coach-web.onrender.com";

function InterviewPractice() {
  const { name } = useParams();
  const navigate = useNavigate();

  const company = decodeURIComponent(name || "");

  const email =
    localStorage.getItem("email") || "";

  const track =
    localStorage.getItem("targetTrack") ||
    "General";

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] =
    useState("");

  const [answerScore, setAnswerScore] =
    useState(null);

  const [totalScore, setTotalScore] =
    useState(0);

  const [answeredQuestions, setAnsweredQuestions] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================
      LOAD COMPANY QUESTIONS
  ========================= */

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/company/${encodeURIComponent(
            company
          )}`
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load interview questions"
          );
        }

        const result =
          await response.json();

        if (
          result.questions &&
          result.questions.length > 0
        ) {
          setQuestions(result.questions);
        } else {
          setQuestions([
            "Tell me about yourself.",
          ]);
        }
      } catch (err) {
        console.error(err);

        setError(
          "Unable to connect to the interview backend. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [company]);

  /* =========================
      SUBMIT ANSWER
  ========================= */

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {
      setSubmitting(true);
      setFeedback("");
      setAnswerScore(null);

      const response = await fetch(
        `${API_URL}/feedback`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            answer: answer.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Feedback request failed"
        );
      }

      const result =
        await response.json();

      const score =
        Number(result.score) || 0;

      setFeedback(
        result.feedback ||
          "Answer evaluated successfully."
      );

      setAnswerScore(score);

      setTotalScore(
        (previous) => previous + score
      );

      setAnsweredQuestions(
        (previous) => previous + 1
      );
    } catch (err) {
      console.error(err);

      alert(
        "Unable to get feedback from backend."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================
      NEXT QUESTION
  ========================= */

  const nextQuestion = async () => {
    if (!feedback) {
      alert(
        "Please submit your answer first."
      );
      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      setAnswer("");
      setFeedback("");
      setAnswerScore(null);

      return;
    }

    await finishInterview();
  };

  /* =========================
      SAVE FINAL RESULT
  ========================= */

  const finishInterview = async () => {
    const finalScore =
      questions.length > 0
        ? Math.round(
            ((totalScore +
              (answerScore || 0)) /
              (questions.length * 10)) *
              100
          )
        : 0;

    try {
      if (email) {
        const response = await fetch(
          `${API_URL}/save-result`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email,
              ats_score:
                Number(
                  localStorage.getItem(
                    "atsScore"
                  )
                ) || 0,

              interview_score:
                finalScore,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to save interview result"
          );
        }
      }

      localStorage.setItem(
        "interviewScore",
        finalScore
      );

      localStorage.setItem(
        "interviewCompany",
        company
      );

      localStorage.setItem(
        "interviewTrack",
        track
      );

      setTotalScore(
        totalScore + (answerScore || 0)
      );

      setCompleted(true);
    } catch (err) {
      console.error(err);

      alert(
        "Interview completed, but the result could not be saved."
      );

      setCompleted(true);
    }
  };

  /* =========================
      START AGAIN
  ========================= */

  const restartInterview = () => {
    setCurrentQuestion(0);
    setAnswer("");
    setFeedback("");
    setAnswerScore(null);
    setTotalScore(0);
    setAnsweredQuestions(0);
    setCompleted(false);
  };

  /* =========================
      BACK
  ========================= */

  const goBack = () => {
    navigate(
      `/company/${encodeURIComponent(
        company
      )}`
    );
  };

  /* =========================
      LOADING
  ========================= */

  if (loading) {
    return (
      <div style={page}>
        <div style={centerBox}>
          <div style={{ fontSize: "45px" }}>
            ⏳
          </div>

          <h2>
            Loading {company} Interview...
          </h2>

          <p style={muted}>
            Connecting to your AI Interview
            Coach backend.
          </p>
        </div>
      </div>
    );
  }

  /* =========================
      ERROR
  ========================= */

  if (error) {
    return (
      <div style={page}>
        <div style={centerBox}>
          <div style={{ fontSize: "45px" }}>
            ⚠️
          </div>

          <h2>
            Backend Connection Failed
          </h2>

          <p style={muted}>
            {error}
          </p>

          <button
            onClick={goBack}
            style={primaryButton}
          >
            ← Back to {company}
          </button>
        </div>
      </div>
    );
  }

  /* =========================
      COMPLETED
  ========================= */

  if (completed) {
    const finalScore =
      questions.length > 0
        ? Math.round(
            (totalScore /
              (questions.length * 10)) *
              100
          )
        : 0;

    return (
      <div style={page}>
        <div style={container}>
          <div style={completedCard}>
            <div
              style={{
                fontSize: "65px",
              }}
            >
              🎉
            </div>

            <h1>
              Interview Completed!
            </h1>

            <p style={muted}>
              You completed the{" "}
              <strong>{company}</strong>{" "}
              interview.
            </p>

            <div style={scoreCard}>
              <span>
                Final Interview Score
              </span>

              <strong>
                {finalScore}%
              </strong>
            </div>

            <div style={resultGrid}>
              <div>
                <span>Company</span>
                <strong>{company}</strong>
              </div>

              <div>
                <span>Track</span>
                <strong>{track}</strong>
              </div>

              <div>
                <span>Questions</span>
                <strong>
                  {questions.length}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  Saved
                </strong>
              </div>
            </div>

            <div style={actions}>
              <button
                onClick={restartInterview}
                style={secondaryButton}
              >
                🔄 Practice Again
              </button>

              <button
                onClick={goBack}
                style={primaryButton}
              >
                ← Company Preparation
              </button>

              <button
                onClick={() =>
                  navigate("/report")
                }
                style={reportButton}
              >
                📊 View Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      INTERVIEW SCREEN
  ========================= */

  const question =
    questions[currentQuestion];

  const progress =
    questions.length > 0
      ? Math.round(
          ((currentQuestion + 1) /
            questions.length) *
            100
        )
      : 0;

  return (
    <div style={page}>
      <div style={container}>

        <button
          onClick={goBack}
          style={backButton}
        >
          ← Back to {company}
        </button>

        {/* Header */}

        <div style={header}>
          <div style={{ fontSize: "50px" }}>
            🎤
          </div>

          <h1>
            {company} Interview Practice
          </h1>

          <p style={muted}>
            Track:{" "}
            <strong>{track}</strong>
          </p>
        </div>

        {/* Progress */}

        <div style={progressCard}>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              Question{" "}
              {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <strong>
              {progress}%
            </strong>
          </div>

          <div
            style={progressBackground}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#2563eb",
                transition:
                  "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Question */}

        <div style={questionCard}>
          <div style={questionLabel}>
            🤖 AI Interviewer
          </div>

          <h2>
            {question}
          </h2>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer here..."
            style={textarea}
            disabled={submitting}
          />

          {/* Feedback */}

          {feedback && (
            <div style={feedbackCard}>
              <div>
                <strong>
                  AI Feedback
                </strong>

                {answerScore !== null && (
                  <span
                    style={{
                      float: "right",
                      color:
                        answerScore >= 8
                          ? "#10b981"
                          : answerScore >= 6
                          ? "#f59e0b"
                          : "#ef4444",
                      fontWeight: "800",
                    }}
                  >
                    {answerScore}/10
                  </span>
                )}
              </div>

              <p style={feedbackText}>
                {feedback}
              </p>
            </div>
          )}

          {/* Buttons */}

          <div style={actions}>
            {!feedback && (
              <button
                onClick={submitAnswer}
                disabled={submitting}
                style={{
                  ...primaryButton,
                  opacity:
                    submitting ? 0.7 : 1,
                }}
              >
                {submitting
                  ? "🤖 Evaluating..."
                  : "🤖 Submit Answer"}
              </button>
            )}

            {feedback && (
              <button
                onClick={nextQuestion}
                style={primaryButton}
              >
                {currentQuestion ===
                questions.length - 1
                  ? "🏁 Finish Interview"
                  : "Next Question →"}
              </button>
            )}
          </div>
        </div>

        {/* Score */}

        <div style={smallStats}>
          <div>
            <span>
              Questions Answered
            </span>

            <strong>
              {answeredQuestions}
            </strong>
          </div>

          <div>
            <span>
              Total Points
            </span>

            <strong>
              {totalScore}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
    STYLES
========================= */

const page = {
  minHeight: "100vh",
  padding: "40px 20px",
  boxSizing: "border-box",
  color: "white",
};

const container = {
  maxWidth: "950px",
  margin: "0 auto",
};

const centerBox = {
  maxWidth: "600px",
  margin: "100px auto",
  textAlign: "center",
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "18px",
  padding: "40px",
};

const header = {
  textAlign: "center",
  marginBottom: "30px",
};

const muted = {
  color: "#9ca3af",
  lineHeight: "1.6",
};

const backButton = {
  background: "#1f2937",
  color: "#d1d5db",
  border: "1px solid #374151",
  padding: "10px 18px",
  borderRadius: "9px",
  cursor: "pointer",
  marginBottom: "25px",
};

const progressCard = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "20px",
};

const progressBackground = {
  height: "9px",
  background: "#374151",
  borderRadius: "20px",
  overflow: "hidden",
};

const questionCard = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "18px",
  padding: "30px",
};

const questionLabel = {
  color: "#60a5fa",
  fontWeight: "700",
  marginBottom: "20px",
};

const textarea = {
  width: "100%",
  minHeight: "200px",
  marginTop: "20px",
  padding: "15px",
  boxSizing: "border-box",
  background: "#1f2937",
  color: "white",
  border: "1px solid #374151",
  borderRadius: "10px",
  resize: "vertical",
  fontFamily: "inherit",
  fontSize: "15px",
  outline: "none",
};

const feedbackCard = {
  marginTop: "20px",
  padding: "18px",
  background: "#172554",
  border: "1px solid #2563eb",
  borderRadius: "12px",
};

const feedbackText = {
  color: "#dbeafe",
  lineHeight: "1.7",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "25px",
};

const primaryButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "13px 20px",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "700",
};

const secondaryButton = {
  background: "#1f2937",
  color: "#d1d5db",
  border: "1px solid #374151",
  padding: "13px 20px",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "700",
};

const reportButton = {
  background: "#d97706",
  color: "white",
  border: "none",
  padding: "13px 20px",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "700",
};

const smallStats = {
  display: "grid",
  gridTemplateColumns:
    "repeat(2, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const completedCard = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "20px",
  padding: "45px 30px",
  textAlign: "center",
};

const scoreCard = {
  background: "#172554",
  border: "1px solid #2563eb",
  borderRadius: "15px",
  padding: "25px",
  margin: "25px auto",
  maxWidth: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const resultGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(2, 1fr)",
  gap: "12px",
  maxWidth: "600px",
  margin: "25px auto",
};

export default InterviewPractice;