import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Countries from "../resources/countries.json";
import { alphabetical } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ setCountry1 }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setCountry1(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Select country</InputLabel>
        <Select value={age} onChange={handleChange}>
          <MenuItem value={"united-states"}>United States</MenuItem>
          {Countries.sort(alphabetical).map((country, idx) => {
            return (
              <MenuItem value={country.Slug} key={idx}>
                {country.Country}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
