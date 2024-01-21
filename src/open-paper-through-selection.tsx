
import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";

export default function Command() {
    const [cat, setCatM] = useState("w")
    const [subjectCode, setSubjectCode] = useState("")
    const [variant, setVarient] = useState("1")
    const [string, setStrn] = useState<string | undefined>()
    const [year, setStrn1] = useState<string | undefined>()
    const [list, setList] = useState([1, 2, 3])

    const setCat = (str: string) => {
        if (str === "m") {
            setList([2])
        } else {
            setList([1, 2, 3])
        }
        setCatM(str)

    }

    function getUrl(type: "ms" | "qp"): string {
        const str = `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/${subjectCode}_${cat}${year}_${type}_${string}${variant}.pdf#view=FitH`
        // console.log(str)
        return str
    }

    function setStrn1Con(str: string) {
        if (str.length < 2) {
            setStrn1("1" + str)
        }
        setStrn1(str.slice(str.length - 2, str.length))
    }

    return (
        <Form
            actions={
                <ActionPanel title="Open past paper">
                    <Action.OpenInBrowser title="Open question paper"
                        url={getUrl("qp")} />
                    <Action.OpenInBrowser title="Open markscheme" url={getUrl("ms")} />
                </ActionPanel>
            }
        >
            <Form.Dropdown id="icon" title="Subject" onChange={setSubjectCode} >
                <Form.Dropdown.Item value="9231" title="Futher maths" />
                <Form.Dropdown.Item value="9708" title="Economics" />
                <Form.Dropdown.Item value="9702" title="Physics" />
                <Form.Dropdown.Item value="9709" title="Maths" />
            </Form.Dropdown>
            <Form.Dropdown id="icon3" title="Category" onChange={setCat} >
                <Form.Dropdown.Item value="m" title="Feb/march" />
                <Form.Dropdown.Item value="s" title="may/june" />
                <Form.Dropdown.Item value="w" title="oct/nov" />
            </Form.Dropdown>
            <Form.Dropdown id="ico3" title="Variant" onChange={setVarient} >
                {list.map((num) => (
                    <Form.Dropdown.Item key={num} value={`${num}`} title={`Var ${num}`} />
                ))}
            </Form.Dropdown>
            <Form.Dropdown id="ico2" title="Variant" onChange={setStrn} >
                <Form.Dropdown.Item value="1" title="type 1" />
                <Form.Dropdown.Item value="2" title="type 2" />
                <Form.Dropdown.Item value="3" title="type 3" />
                <Form.Dropdown.Item value="4" title="type 4" />
            </Form.Dropdown>
            <Form.TextField
                id="subjectFeilds"
                title="Year"
                placeholder="Enter year here"
                onChange={setStrn1Con}
            />
        </Form>
    );
}
