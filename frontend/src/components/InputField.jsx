function InputField({ label, error, id, ...props }) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? (
        <small id={`${id}-error`} className="form-error">
          {error}
        </small>
      ) : null}
    </label>
  );
}

export default InputField;
