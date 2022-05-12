import styles from './editfield.module';
import { useState } from 'react';

function EditField(props) {
  const [changes, setChanges] = useState({
    field: props.field,
    newValue: props.value,
  });

  const handleChange = (e) => {
    if (props.type == 'map') {
      setChanges({ ...changes, newValue: { ...changes.newValue, [e.target.name]: e.target.value } });
    }
    if (props.type == 'array') {
      changes.newValue[e.target.name] = e.target.value;
      setChanges({ ...changes, newValue: [...changes.newValue] });
    } else {
      setChanges({ ...changes, newValue: e.target.value });
    }
  };

  if (props.type == ('map' || 'array')) {
    return (
      <div className={styles.root} onMouseLeave={props.close}>
        <div className={styles.editField && styles.composit}>
          <div className={styles.field}>{props.field}</div>
          <div className={styles.compositValues}>
            {Object.keys(props.value).map((key, i) => {
              return (
                <div className={styles.editField} key={i}>
                  <div className={styles.field}>{key}</div>
                  <div className={styles.value}>
                    <input name={key} type="text" onChange={handleChange} value={changes.newValue[key]} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.actions}>
          {' '}
          <button onClick={props.close}>Cancel</button>{' '}
          <button
            onClick={() => {
              props.save({ [changes.field]: changes.newValue });
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.root} onMouseLeave={props.close}>
      <div className={styles.editField}>
        <div className={styles.field}>{props.field}</div>
        <div className={styles.value}>
          <input type="text" name={props.field} onChange={handleChange} value={changes.newValue} />
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={props.close}>Cancel</button>
        <button
          onClick={() => {
            props.save({ [changes.field]: changes.newValue });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditField;
