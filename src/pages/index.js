import { useState, useEffect } from "react";
import Answer from "../../components/Answer";
import Questions from "../../components/Question";
import Head from "next/head";
import Lost from "../../components/Lost";
import Start from "../../components/Start";
import Prizes from "../../components/Prizes";
import Next from "../../components/Next";
import Win from "../../components/Win";
import Helpers from "../../components/Helpers";
import End from "../../components/End";
import Image from "next/image";

import WinSound from "../../audio/win.mp3";
import LoseSound from "../../audio/lose.mp3";
import Megjelolo from "../../audio/megjelolo.mp3";
import Suspense from "../../audio/suspense.mp3";

export default function Home() {
  const [isStart, setIsStart] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [isAudience, setIsAudience] = useState(false);
  const [isTele, setIsTele] = useState(false);
  const [isHalving, setIsHalving] = useState(false);
  const [isHalvingBackg, setHalvingBackg] = useState(false);
  const [teamQuestionsCounter, setTeamQuestionsCounter] = useState(1);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [elapsedTimePhone, setElapsedTimePhone] = useState(0);
  const [isPhoneStart, setIsPhoneStart] = useState(false);
  const [teleDesign, setTeleDesign] = useState(false);
  const [isDoubled, setIsDoubled] = useState(false);

  const [winSound, setWinSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [flagSound, setFlagSound] = useState(null);
  const [suspenseSound, setSuspenseSound] = useState(null);

  // SOUND OBJECT DEFINING
  useEffect(() => {
    setWinSound(new Audio(WinSound));
    setLoseSound(new Audio(LoseSound));
    setFlagSound(new Audio(Megjelolo));
    setSuspenseSound(new Audio(Suspense));
  }, []);

  const questions = [
    {
      1: {
        question: "Mi a T.I.B.N jelentése?",
        answers: [
          "A: Te is dobod nem",
          "B: Team in beer, no?",
          "C: Tibi is bedobja, nem?",
          "D: Te is bedobod, nem?",
        ],
        rightAnswerIndex: 4,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 0],
      },
      2: {
        question: "Melyik nem magyar sörmárka?",
        answers: ["A: Heineken", "B: Borsodi", "C: Dreher", "D: Soproni"],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      3: {
        question: "Melyik megyében található kecskemét?",
        answers: [
          "A: Bács-Kiskun",
          "B: Baranya",
          "C: Jász-Nagykun-Szolnok",
          "D: Csongrád-Csanád",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      4: {
        question: "Hány féle gyógynövényt tartalmaz a Jager?",
        answers: ["A: 52", "B: 43", "C: 56", "D: 58"],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      5: {
        question:
          "Meddig érvényes az őszi félévben kapott diákigazolvány matrica?",
        answers: [
          "A: Január 31.",
          "B: Március 31.",
          "C: Február 31.",
          "D: Április 31",
        ],
        rightAnswerIndex: 2,
        halving: [0, 3],
      },
      6: {
        question: "Hány tanszék van a GAMF-on?",
        answers: ["A: 3", "B: 4", "C: 3.5", "D: 2"],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      7: {
        question: "Melyik ország autójelzése az S?",
        answers: ["A: Spanyolország", "B: Svájc", "C: Skócia", "D: Svédország"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
    },
    {
      1: {
        question:
          "Hány forint egy havi kollégium az állami ösztöndíjasok számára?",
        answers: [
          "A: 15 999 Ft",
          "B: 16 500 Ft",
          "C: 18 000 Ft",
          "D: 16 000 Ft",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Miből áll a hosszúlépés fröccs?",
        answers: [
          "A: 2dl bor 1dl szóda",
          "B: 1dl bor 2dl szóda",
          "C: 2dl bor 2dl szóda",
          "D: 3dl bor 2dl szóda",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      3: {
        question:
          "Mikor alapították az egyetem jogelődjét, a Felsőfokú Gépipari Technikumot?",
        answers: ["A: 1961", "B: 1964", "C: 1972", "D: 2000"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Ki Kecskemét hírös szülötte?",
        answers: [
          "A: Kodály Zoltán",
          "B: Erkel Ferenc",
          "C: Kölcsey Ferenc",
          "D: Arany János",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Mi a IJAT jelentése?",
        answers: [
          "A: Innovatív Járgányok Aránytalan Áttétele",
          "B: Innovatív Anyagok és Jármű Tanszék",
          "C: Innovatív Jármű és Anyag Tanszék",
          "D: Innovatív Járművek és Anyagok Tanszék",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question:
          "Melyik város található legközelebb légvonalban Kecskeméthez?",
        answers: ["A: Szeged", "B: Paks", "C: Békéscsaba", "D: Budapest"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question: "Ki Kecskemét védőszentje?",
        answers: [
          "A: Szent József",
          "B: Szent Miklós",
          "C: Szent István",
          "D: Szent Mária",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
    },
    {
      1: {
        question: "Hány országgal határos Magyarország?",
        answers: ["A: 6", "B: 8", "C: 9", "D: 7"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Melyik kar jelenleg NEM az egyetem része?",
        answers: [
          "A: GAMF Műszaki és Informatikai Kar",
          "B: Pedagógusképző Kar",
          "C: Gazdaságtudományi Kar",
          "D: Kertészeti és Vidékfejlesztési Kar",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      3: {
        question: "Melyik nevet NEM viselte még hivatalosan az egyetemünk?",
        answers: [
          "A: Neumann János Egyetem",
          "B: Kecskeméti Egyetem",
          "C: Pallasz Aténé Egyetem",
          "D: Felsőfokú Gépipari Tecnikum",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Mit jelent az „IPA” rövidítés?",
        answers: [
          "A: India Pale Ale",
          "B: International Pale Ale",
          "C: Irish Pils Ale",
          "D: Indian Porter Ale",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Ki írta a Beszélő Köntös című regényt?",
        answers: [
          "A: Jókai Mór",
          "B: Móricz Zsigmond",
          "C: Kosztolányi Dezső",
          "D: Mikszáth Kálmán",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question: "Mit jelent a csetresz?",
        answers: [
          "A: Zokni",
          "B: Mosatlan edény",
          "C: Egy magyar étel",
          "D: Kutyaól",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question:
          "Mely kontinensen volt gyarmata az Osztrák-Magyar Monarchiának?",
        answers: [
          "A: Afrika",
          "B: Ázsia",
          "C: Dél-Amerika",
          "D: Észak-Amerika",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
    },
    {
      1: {
        question: "Mi a HSZK jelentése?",
        answers: [
          "A: Hallgatói Szociális Központ",
          "B: Hallgatói Szakközpont",
          "C: Hallgatói Szakkollégium",
          "D: Hallgatói Szolgáltató Központ",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Hogyan köthető Neumann János neve Kecskeméthez?",
        answers: [
          "A: Itt született",
          "B: Egyetemet neveztek el róla",
          "C: Itt tanult",
          "D: Itt találta fel a számítógépet",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      3: {
        question: "Hogyan készül a Vice Házmester fröccs?",
        answers: [
          "A: 3 dl bor 2 dl szóda",
          "B: 2 dl bor 3 dl szóda",
          "C: 4 dl bor 1 dl szóda",
          "D: ezek közül egyik sem",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Ki a GAMF kar dékánja?",
        answers: [
          "A: Dr. Kovács Lóránt",
          "B: Dr. Tóth Ákos",
          "C: Dr. Béres Gábor",
          "D: Dr. Török Erika",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Melyik megyével NEM határos Bács-Kiskun megye?",
        answers: ["A: Fejér", "B: Tolna", "C: Baranya", "D: Békés "],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question: "Ki zenésítette meg a Szózatot?",
        answers: [
          "A: Vörösmarty Mihály",
          "B: Egressy Béni",
          "C: Liszt Ferenc",
          "D: Erkel Ferenc",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question: "Miből készül a Moscowe Mule?",
        answers: [
          "A: 4cl tequila, 2cl eperlé, 3dl szóda",
          "B: 4cl vodka, 2cl limelé, 3dl gyömbér sör",
          "C: 4cl vodka, 2cl citromlé, 3dl sprite",
          "D: 4cl vodka, fél gerezd citrom, 4dl lager",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
    },
    {
      1: {
        question: "Hányadik vágányról indult Harry Potter vonata?",
        answers: ["A: 1", "B: 11A", "C: 9 és ½", "D: 9 és ¾"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Ki nyerte a 2014-es foci VB-t?",
        answers: [
          "A: Argentína",
          "B: Németország",
          "C: Franciaország",
          "D: Spanyolország",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      3: {
        question: "Melyik nem hungarikum ital?",
        answers: ["A: Unicum", "B: St.Hubertus", "C: Törley", "D: Kőbányai"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Mi a GAMF jelentése?",
        answers: [
          "A: Gépipari és automatizálási műszaki főiskola",
          "B: Gépészeti Műszaki és Alaptudományi Főiskola",
          "C: Gépgyártó és autóipari műszaki főiskola",
          "D: Gépészeti és automatizálási műszaki főiskola",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Mit jelent a zákányos?",
        answers: ["A: Makacs", "B: Szomorú", "C: Vicces", "D: Részeg"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question:
          "Meddig lehet leadni a Rendszeres szociális ösztöndíj kérvényt?",
        answers: [
          "A: Szeptember 20",
          "B: Szeptember 22",
          "C: Szeptember 30",
          "D: Szeptember 15",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question:
          "Melyik évszázadban említik először Kecskemét nevét a történelemben?",
        answers: ["A: 15.", "B: 14.", "C: 13.", "D: 16."],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
    },
  ];
  
  const prizes = [
    "2 shot",
    "4 pohár sör",
    "4 shot",
    "2 shot",
    "4 hosszúlépés",
    "8 shot",
    "12 shot",
  ];

  // LEJÁR AZ IDO HANDLER
  useEffect(() => {
    if (elapsedTime == 60) {
      setElapsedTime(0);
      setEnd(true);
      setPrizeIndex(0);
      suspenseSound.pause();
      loseSound.load();
      loseSound.play();
    }
  }, [elapsedTime]);

  const currentQuestions = questions[currentTeamIndex];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // COUNTER 60s
  useEffect(() => {
    let timerId = 0;
    if (isStart) {
      timerId = setInterval(() => {
        if (elapsedTime !== 60 && !isAnswerClicked && !isTele) {
          setElapsedTime((prevTime) => prevTime + 1);
        } else {
          setElapsedTime(elapsedTime);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTime, isStart, isAnswerClicked, isTele]);

  //COUNTER 30s -- Phone help
  useEffect(() => {
    let timerId = 0;
    if (isPhoneStart) {
      timerId = setInterval(() => {
        if (elapsedTimePhone !== 30) {
          setElapsedTimePhone((prevTime) => prevTime + 1);
        } else {
          setElapsedTimePhone(elapsedTimePhone);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTimePhone, isPhoneStart]);

  // START SUSPENSE SOUND HANDLER
  useEffect(() => {
    if (isStart) {
      suspenseSound.load();
      suspenseSound.play();
      setTimeout(() => {
        suspenseSound.pause();
      }, 60000);
    }
  }, [isStart]);

  // Answer handler
  function handleAnswer(index) {
    setIsAnswerClicked(true);
    if (currentQuestion.rightAnswerIndex === index + 1) {
      setTimeout(() => {
        winSound.load();
        winSound.play();
        suspenseSound.pause();
      }, 3000);
      setTimeout(() => {
        setDisplayFlag(true);
        setPrizeIndex((prev) => prev + 1);
        winSound.pause();
        flagSound.load();
        flagSound.play();
        setTimeout(() => {
          flagSound.pause();
        }, 4000);
      }, 7000);
    } else {
      setTimeout(() => {
        setEnd(true);
        setPrizeIndex(0);
        suspenseSound.pause();
        loseSound.load();
        loseSound.play();
      }, 5000);
    }
  }

  // NEXT QUESTION HANDLER
  function nextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
    setElapsedTime(0);
    setIsTele(false);
    setDisplayFlag(false);
    setIsHalving(false);
    setIsAnswerClicked(false);
    suspenseSound.load();
    suspenseSound.play();
  }

  // Next team handler
  function restartNext() {
    setTeamQuestionsCounter((prev) => prev + 1);
    if (questions.length !== teamQuestionsCounter) {
      setCurrentTeamIndex((prev) => prev + 1);
    }
    setCurrentQuestionIndex(1);
    setElapsedTime(0);
    setEnd(false);
    setIsStart(false);
    setIsAnswerClicked(false);
    setDisplayFlag(false);
    setIsAudience(false);
    setIsTele(false);
    setIsHalving(false);
    setHalvingBackg(false);
    setPrizeIndex(0);
    setElapsedTimePhone(0);
    setIsPhoneStart(false);
    setTeleDesign(false);
  }

  // HALVING HANDLER
  function halving() {
    if (isHalving) {
      delete currentQuestion.answers[currentQuestion.halving[0]];
      delete currentQuestion.answers[currentQuestion.halving[1]];
    }
  }

  function Doubled() {
    setIsDoubled(!isDoubled);
  }

  return (
    <>
      <Head>
        <title>Legyen Ön is Ittas! | NJE</title>
        <meta name="description" content="Legyen Ön is Ittas! | NJE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/beer.png" />
      </Head>
      <main className="cursor-default">
        <div className="text-white text-[40px] flex justify-center items-center gap-10">
          <div>
            <Image src="/hoklogo.png" width={200} height={200} alt="" />
          </div>
          <div>
            <Image
              src="/kontoslogo.svg"
              width={200}
              height={200}
              alt=""
              onClick={() => Doubled()}
            />
          </div>
        </div>
        {/* IDE LEHET KELL NEGATIV MARGIN */}
        <div className="-mt-[300px]">
          <div className="flex justify-between">
            <Prizes
              prizes={prizes}
              prizeIndex={prizeIndex}
              isDoubled={isDoubled}
            />
            <Helpers
              halving={halving()}
              audience={setIsAudience}
              isAudience={isAudience}
              tele={setIsTele}
              isTele={isTele}
              isHalving={isHalving}
              setHalving={setIsHalving}
              setHalvingBackg={setHalvingBackg}
              isHalvingBackg={isHalvingBackg}
              setIsPhoneStart={setIsPhoneStart}
              elapsedTimePhone={elapsedTimePhone}
              setTeleDesign={setTeleDesign}
              teleDesign={teleDesign}
            />
          </div>
          <div className="grid justify-center">
            {isEnd && <Lost restartHandler={restartNext} />}
            {!isStart && <Start startHandler={setIsStart} isStart={isStart} />}
            {displayFlag && prizes.length !== prizeIndex && (
              <Next
                nextQuestion={nextQuestion}
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {prizes.length === prizeIndex && (
              <Win
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {questions.length + 1 === teamQuestionsCounter && <End />}
            <div className="flex justify-center items-center text-white">
              <p className="text-[72px]">{60 - elapsedTime}</p>
            </div>
            <Questions q={currentQuestion.question} />
            <div className="grid grid-cols-2 gap-5">
              {currentQuestion.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    a={answer}
                    i={index}
                    rightAnswerIndex={currentQuestion.rightAnswerIndex}
                    handleAnswer={handleAnswer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
