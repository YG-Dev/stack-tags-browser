import ErrorInfoBox from "../components/ErrorInfoBox";
import { ErrorInfoBoxProps } from "../components/ErrorInfoBox";

export default {
    title: 'ErrorInfoBox',
    component: ErrorInfoBox
}

export const Default = (args: ErrorInfoBoxProps) => <ErrorInfoBox {...args} />;

Default.args = {
    message: 'This is a test error message'
}