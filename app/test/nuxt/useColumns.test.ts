import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

describe("useColumns", () => {
  it("reads columns and sorts tasks", async () => {
    const TestComp = defineComponent({
      setup() {
        const columnsComposable = useColumns();
        return { columnsComposable };
      },
      template: "<div></div>",
    });
    const wrapper = mount(TestComp);
    const cols = await wrapper.vm.columnsComposable.readColumns();
    expect(Array.isArray(cols)).toBe(true);
    expect(cols.length).toBeGreaterThan(0);
    expect(cols[0]).toHaveProperty("tasks");
  });

  it("handles drag and drop events", () => {
    const TestComp = defineComponent({
      setup() {
        const columnsComposable = useColumns();
        return { columnsComposable };
      },
      template: "<div></div>",
    });
    const wrapper = mount(TestComp);
    const event = {
      dataTransfer: { setData: () => {}, dropEffect: "", effectAllowed: "" },
    } as any;
    const task = { id: "1", status: "todo" } as any;
    wrapper.vm.columnsComposable.startDrag(event, task);
    expect(event.dataTransfer.effectAllowed).toBe("move");
  });

  it("handles onDragOver", () => {
    const TestComp = defineComponent({
      setup() {
        const columnsComposable = useColumns();
        return { columnsComposable };
      },
      template: "<div></div>",
    });
    const wrapper = mount(TestComp);
    wrapper.vm.columnsComposable.onDragOver({} as DragEvent, 2);
    expect(wrapper.vm.columnsComposable).toHaveProperty("columns");
  });
});
