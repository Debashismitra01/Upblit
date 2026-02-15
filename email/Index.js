import dotenv from "dotenv";
dotenv.config();
console.log("ENV loaded:", process.env.RESEND_API_KEY ? "YES" : "NO");
import express from "express";
import generateOnboardingEmail from "./Template/Onboarding.js";
import sendEmail from "./sender.js";
import middleware from "./Middleware.js";
const app = express();
app.use(express.json());
app.use(middleware)
app.post("/tester",(req,res)=>{
    res.send("HElllooo from Email");
})
app.post("/",async (req, res) => {
    const {template, name, email } = req.body;
    if(template=="onboarding"){
    const subject="Welcome to the Platform – Let’s Get Started";
    const html = generateOnboardingEmail(!name?"fellow developer":name);
    console.log(html);
    await sendEmail([email],subject,html);
    res.send("Email Sent");
    }
    else res.send("Not a Valid Template")
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});