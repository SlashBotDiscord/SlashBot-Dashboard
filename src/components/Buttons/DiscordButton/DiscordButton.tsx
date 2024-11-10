import styles from "./DiscordButton.module.css";

export default function DiscordButton({
    label,
    style
}: {
    label: string;
    style: 1 | 2 | 3 | 4;
}) {
    return (
        <button className={`${styles.button} ${styles[`buttonstyle_${style}`]}`}>
            {label}
        </button>
    )
}