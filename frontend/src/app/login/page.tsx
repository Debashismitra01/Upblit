import styles from "./login.module.css";
import Navbar from "../component/navbar/navbar";
import BG from "../component/background/background";
export default function Login() {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const githubUri = `${baseApiUrl}/oauth2/authorization/github`;
  const gitlabUri = `${baseApiUrl}/oauth2/authorization/gitlab`;
  const bitbucketUri = `${baseApiUrl}/oauth2/authorization/bitbucket`;

  return (
    <>
      <BG />
      <Navbar />
      <section className={styles.loginPage}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.badge}>Upblit Platform</span>
            <h1 className={styles.title}>Deploy your project like an expert.</h1>
            <p className={styles.subtitle}>
              Select a Git provider to import an existing project from a Git repository and accelerate your deployment
              workflow with Upblit.
            </p>
            <div className={styles.callout}>
              <p>
                Authenticated connections keep your repositories in sync with Upblit, unlocking preview builds,
                automated testing, and reliable CI/CD pipelines.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Sign in to continue</h2>
              <p>Authenticate with your preferred Git provider to set up your workspace.</p>
            </div>

            <div className={styles.providerList}>
              <a href={githubUri} className={`${styles.providerButton} ${styles.github}`}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.providerIcon}>
                  <path
                    d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"
                  ></path>
                </svg>
                <span>Login with GitHub</span>
              </a>

              <a href={gitlabUri} className={`${styles.providerButton} ${styles.gitlab}`}>
                <svg viewBox="0 0 24 24" className={styles.providerIcon} xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.548 13.614l-2.05-6.32a.799.799 0 0 0-1.518-.026l-1.684 5.191H6.704L5.02 7.268a.799.799 0 0 0-1.518.025L1.452 13.615a.799.799 0 0 0 .305.89l9.243 6.397a.8.8 0 0 0 .902 0l9.243-6.398a.8.8 0 0 0 .403-.89"></path>
                </svg>
                <span>Login with GitLab</span>
              </a>

              <a href={bitbucketUri} className={`${styles.providerButton} ${styles.bitbucket}`}>
                <svg viewBox="0 0 24 24" className={styles.providerIcon} xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.4 3.3c-.2 0-.3.1-.3.3l2.5 16.6c0 .2.2.4.4.4h16.6c.2 0 .3-.1.3-.3L22.9 3.6c0-.2-.1-.3-.3-.3H1.4zm14.8 11.4h-7.8l-.7-4.5h9.1l-.6 4.5z" />
                </svg>
                <span>Login with Bitbucket</span>
              </a>
            </div>

            <p className={styles.cardNote}>
              We never store your repository credentials. You will be redirected to authorize access directly with your
              provider.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
