import { useState } from "react";
import styles from "./styles.module.css";

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltip, setTooltip] = useState(styles.hidden);

  const [timer, setTimer] = useState<number>();

  const popupDetach = () => {
    setTimer(
      setTimeout(() => {
        setTooltip(styles.hidden);
      }, 800)
    );
  };

  const popUpToggle = () => {
    clearTimeout(timer);
    setTooltip(styles.visible);
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Kanban Board v2</h1>
      <div className={styles.userLogInContainer}>
        {!loggedIn && (
          <button
            className={styles.logButton}
            onClick={() => {
              setLoggedIn(true);
            }}
          >
            Log In
          </button>
        )}
        {loggedIn && (
          <div className={styles.logInAdminPlaceholder}>
            <div className={styles.userInfo}>
              <img
                className={styles.userImageContainer}
                src="https://media.tenor.com/k-D9uiONXA4AAAAM/%D0%B5%D0%BD%D0%BE%D1%82.gif"
                alt="img"
              />
              <p className={styles.userName}>Admin</p>
            </div>
            <div className={styles.logOutTooltip + " " + tooltip}>
              <button
                onMouseEnter={() => {
                  popUpToggle();
                }}
                onMouseLeave={() => {
                  popupDetach();
                }}
                onClick={() => {
                  setLoggedIn(false);
                }}
                className={styles.logButton}
              >
                Log out
              </button>
            </div>
            <div
              className={styles.popupTooltiptoggle}
              onMouseLeave={() => {
                popupDetach();
              }}
              onMouseEnter={() => {
                popUpToggle();
              }}
            >
              ˇ
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
