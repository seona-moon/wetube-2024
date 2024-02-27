import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import app from "./server.js";

const PORT = 4000;

//외부 접속을 허용
const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT} 🚀"`);

app.listen(PORT, handleListening);
