import { useEffect, useState } from "react";

const Greetings = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";

  const today = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString("en-IN");
  return (
    <>
      <div className="container-fluid mb-1">
        <h6>{greeting}</h6>
        <div className="">
          
            <h5>
            Welcome Back , <strong>{user.name}!</strong>
          </h5>
          <small>Here's what happening with your system Today</small>

          

          {/* <h6 className="text-end">{time}</h6> */}
        </div>
      </div>
    </>
  );
};

export default Greetings;