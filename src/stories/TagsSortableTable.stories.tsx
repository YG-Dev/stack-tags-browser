import { TagItems } from "../components/HomePage";
import TagsSortableTable from "../components/TagsSortableTable";
import data from "./assets/tags-30-mock";

export default {
    title: 'TagsSortableTable',
    component: TagsSortableTable,
    argTypes: {
        onCellClick: { action: 'onCellClick' },
        onPaginationModelChange: { action: 'onPaginationModelChange' }
    }
}

export const Default = (args: TagItems) => <TagsSortableTable {...args} />;

Default.args = {
    items: data.items
}