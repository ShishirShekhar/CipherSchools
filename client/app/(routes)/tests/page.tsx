"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Selection, Test } from "@/lib/types";
import WebCam from "@/components/WebCam/WebCam";
import styles from "./Tests.module.css";

export default function TestPage() {
  const _id = "66c44a3ba56219c89e636138";
  const [test, setTest] = useState<Test | null>(null);
  const [curQues, setCurrQues] = useState(0);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleNextQuestion = () => {
    test &&
      setCurrQues((prev) => Math.min(prev + 1, test.questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrQues((prev) => Math.max(prev - 1, 0));
  };

  const isChecked = (questionId: string, option: string) => {
    const selection = selections.find(
      (selection) => selection.questionId === questionId
    );

    return selection ? selection.option === option : false;
  };

  const handleOptionChange = (questionId: string, option: string) => {
    setSelections((prev) => {
      const existingIndex = prev.findIndex(
        (selection) => selection.questionId === questionId
      );
      if (existingIndex !== -1) {
        // Update existing selection
        const updatedSelections = [...prev];
        updatedSelections[existingIndex] = {
          questionId,
          option,
          savedAt: new Date(),
        };
        return updatedSelections;
      } else {
        // Add new selection
        return [...prev, { questionId, option, savedAt: new Date() }];
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testId: test?._id,
            selections,
            endedAt: new Date(),
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Test submitted successfully");
        router.push("tests/finish"); // Redirect to the finish page
      } else {
        console.log(data);
        toast.error("An error occurred while submitting the test.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting the test.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tests/${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (res.ok) {
          console.log(data.test);
          setTest(data.test);
        } else {
          toast.error("Failed to fetch questions");
        }
      } catch (err) {
        toast.error("An error occurred while fetching questions");
      }
    };

    fetchTest();
  }, []);

  if (!test) {
    return <h1>Test not found!</h1>;
  }

  return (
    <div className={styles.tests}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{test.title}</h1>
          </div>

          {test.questions && test.questions[curQues] && (
            <div className={styles.questionContainer}>
              <div className={styles.quesNumHeadingContainer}>
                <h2 className={styles.quesNumHeader}>
                  Question Number {curQues + 1}
                </h2>
              </div>

              <p className={styles.question}>
                Q. {test.questions[curQues].question}
              </p>

              <div className={styles.optionsContainer}>
                {test.questions[curQues].options.map((option, index) => {
                  return (
                    <div key={index} className={styles.options}>
                      <input
                        type="radio"
                        name="options"
                        id={option}
                        key={index}
                        value={option}
                        checked={isChecked(test.questions[curQues]._id, option)}
                        onChange={() =>
                          handleOptionChange(
                            test.questions[curQues]._id,
                            option
                          )
                        }
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <button
            className={styles.btn}
            onClick={handlePreviousQuestion}
            disabled={curQues === 0}
          >
            Previous
          </button>
          <button
            className={styles.btn}
            onClick={handleNextQuestion}
            disabled={curQues === test.questions?.length - 1}
          >
            Next
          </button>
          <button
            className={styles.btn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </div>

      <div className={styles.sidePanel}>
        <div className={styles.videoContainer}>
          <WebCam />
        </div>

        <div className={styles.questionsSection}>
          {test.questions.length > 0 &&
            test.questions.map((_, index) => {
              return (
                <button
                  key={index}
                  className={styles.quesNum}
                  onClick={() => setCurrQues(index)}
                >
                  {index + 1}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
