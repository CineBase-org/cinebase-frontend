import { Link } from "react-router-dom";

import styles from "./PickerCallout.module.scss";

export const PickerCallout = () => (
    <div className={styles.callout}>
        <div>
            <p className={styles.kicker}>CAN'T DECIDE?</p>
            <p className={styles.title}>Try Movie Picker</p>
        </div>

        {/* TODO: point to the Movie Picker route once it exists */}
        <Link
            to="/"
            className={styles.button}
        >
            Pick Film →
        </Link>
    </div>
);
