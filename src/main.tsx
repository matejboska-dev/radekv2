import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { restorePrerenderHead } from './lib/prerender';

restorePrerenderHead();
createRoot(document.getElementById("root")!).render(<App />);
