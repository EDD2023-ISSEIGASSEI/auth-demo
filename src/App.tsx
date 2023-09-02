import { useState } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [idExists, setIdExists] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const signUp = async () => {
    const data = {
      id: id,
      name: name,
      password: password,
    };
    const res = await fetch("/api/signUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      console.log(await res.json());
      setStep(2);
    } else {
      console.log(res.body);
    }
  };

  const changeId = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    const data = { id: event.target.value };
    const res = await fetch("/api/idIsExists", {
      mode: "cors",
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      const json = await res.json();
      console.log(json);
      setIdExists(json["isExists"]);
    } else {
      console.log(res.body);
    }
  };

  const signIn = async () => {
    const data = {
      id: id,
      password: password,
    };
    const res = await fetch("/api/signIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      console.log(await res.json());
      setStep(3);
    } else {
      console.log(res.body);
    }
  };

  const back = () => setStep(1);

  const verify = async () => {
    const data = {
      otp: otp,
    };
    let endpoint = "lineRegistration";
    if (step == 3) {
      endpoint = "checkOtp";
    }
    const res = await fetch(`/api/${endpoint}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      console.log(await res.json());
      setStep(4);
    } else {
      console.log(res.body);
    }
  };

  if (step == 1) {
    return (
      <>
        <div>
          <p>
            id :: <span>{idExists ? "already used" : "OK"}</span>
          </p>
          <input type="text" value={id} onChange={changeId} />
          <p>name</p>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <p>password</p>
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <p></p>
        <button
          style={{ backgroundColor: "blue", marginRight: "10px" }}
          onClick={signUp}
        >
          signUp
        </button>
        <button style={{ backgroundColor: "green" }} onClick={signIn}>
          signIn
        </button>
      </>
    );
  } else {
    return (
      <>
        <div>
          {step == 4 ? <p>OK</p> : undefined}
          <p>OTP</p>
          <input
            type="text"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
        </div>
        <p></p>
        <button
          style={{ backgroundColor: "blue", marginRight: "10px" }}
          onClick={verify}
        >
          verify
        </button>
        <p></p>
        <button onClick={back}>back</button>
      </>
    );
  }
}

export default App;
