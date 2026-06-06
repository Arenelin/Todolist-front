import { DividerHorizontalIcon, CheckIcon } from "@radix-ui/react-icons";
import {Checkbox, CheckboxIndicator, CheckedState} from "@radix-ui/react-checkbox";
import {useState} from "react";

export const StyledCheckbox = () => {
    const [checked, setChecked] = useState<CheckedState>("indeterminate");

    return (
        <>
            <Checkbox checked={checked} onCheckedChange={setChecked}>
                <CheckboxIndicator>
                    {checked === "indeterminate" && <DividerHorizontalIcon />}
                    {checked && <CheckIcon />}
                </CheckboxIndicator>
            </Checkbox>

            <button
                type="button"
                onClick={() =>
                    setChecked((prevIsChecked) =>
                        prevIsChecked === "indeterminate" ? false : "indeterminate",
                    )
                }
            >
                Toggle indeterminate
            </button>
        </>
    );
};
