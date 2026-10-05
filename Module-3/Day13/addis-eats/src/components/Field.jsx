function Field({ label, id, error, children }) {
    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p id={`${id}-error`} role="alert">{error}</p>}
        </div>
    );
}

export default Field;