export default function generateOnboardingEmail(clientName) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Welcome Onboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background: #ffffff;
                margin: auto;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
            .header {
                font-size: 22px;
                font-weight: bold;
                color: #333;
            }
            .content {
                margin-top: 20px;
                font-size: 16px;
                color: #555;
                line-height: 1.6;
            }
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #999;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 18px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Hey ${clientName},
            </div>

            <div class="content">
                <p>I just wanted to personally welcome you. I’m genuinely glad to have you onboard.</p>

                <p>I’ll be working closely to make sure everything runs smoothly for you. If you ever face issues, have feedback, or just want to discuss ideas, you can directly reach out.</p>

                <p>You can get started using the platform from here:</p>

                <a href="#" class="btn">Get Started</a>

                <p>Looking forward to working together.</p>

                <p>
                    Cheers,<br/>
                    Debashis Mitra
                </p>
            </div>

            <div class="footer">
                © ${new Date().getFullYear()} Debashis Mitra
            </div>
        </div>
    </body>
    </html>
    `;
}


