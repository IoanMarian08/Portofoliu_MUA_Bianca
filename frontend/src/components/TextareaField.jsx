function TextareaField({ label, error, id, ...props }) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <small id={`${id}-error`} className="form-error">
          {error}
        </small>
      ) : null}
    </label>
  );
}

export default TextareaField;
