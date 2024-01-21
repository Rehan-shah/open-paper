import { ActionPanel, Action, Form } from "@raycast/api";
import { useState } from "react";


type Cat = "s" | "m" | "w"

type CodeStruct = {
    subjectCode: number,
    cat: Cat,
    year: number,
    varienat: number
}

export default function Command() {
    const [code, setCode] = useState("")
    const [error, setEroor] = useState<undefined | string>()
    const [codeStruct, setCodeStruct] = useState<undefined | CodeStruct>()


    const checkIfValid = () => {
        const arr = code.trim().split("/")
        const mainStruct: CodeStruct = {
            subjectCode: 0,
            cat: "s",
            year: 0,
            varienat: 0
        }
        if (arr.length !== 5) {
            setEroor("invalid string")
            return
        }

        if (arr[0].length !== 4) {
            setEroor("invalid string")
            return
        }

        const val = parseInt(arr[0])
        if (isNaN(val)) {
            setEroor("invalid string")
            return
        }
        mainStruct.subjectCode = val
        switch (arr[2].toLowerCase()) {
            case "f":
                mainStruct.cat = "m"
                break;
            case "m":
                mainStruct.cat = "s"
                break;
            case "o":
                mainStruct.cat = "w"
                break;
            default:
                setEroor("invalid string")
                return
        }
        if (arr[1].length !== 2 && arr[4].length !== 2) {
            setEroor("invalid string")
            return
        }


        const vari = parseInt(arr[1])
        const year = parseInt(arr[4])
        if (isNaN(vari) || isNaN(year)) {
            setEroor("invalid string")
        }
        mainStruct.varienat = vari
        mainStruct.year = year
        setCodeStruct(mainStruct)
        return
    }

    function setString(val: string) {
        setEroor(undefined)
        setCode(val)
    }

    function getUrl(type: "ms" | "qp"): string {
        return `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/${codeStruct?.subjectCode}_${codeStruct?.cat}${codeStruct?.year}_${type}_${codeStruct?.varienat}.pdf#view=FitH`
    }

    return (
        <Form actions={
            <ActionPanel title="Open past paper">
                <Action.OpenInBrowser title="Open question paper"
                    url={getUrl("qp")} />
                <Action.OpenInBrowser title="Open markscheme" url={getUrl("ms")} />
            </ActionPanel>
        }>
            <Form.TextField
                id="subjectFeild"
                title="Full paper code"
                error={error}
                placeholder="Enter the paper code here"
                onBlur={checkIfValid}
                onChange={setString}
            />
        </Form>
    )

}

