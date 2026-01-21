import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

vi.stubGlobal("crypto", {
  randomUUID: () => "mock-uuid",
});

describe("useCrud", () => {
  let composable: ReturnType<typeof useCrud>;

  const createTestComponent = () => {
    return defineComponent({
      setup() {
        const crud = useCrud();
        return { crud };
      },
      template: "<div></div>",
    });
  };

  beforeEach(() => {
    const TestComp = createTestComponent();
    const wrapper = mount(TestComp);
    composable = wrapper.vm.crud;
    composable.items.value = [];
  });

  it("creates a task", async () => {
    const task = await composable.create({
      title: "Test Task",
      status: "todo",
    });
    expect(composable.items.value[0]).toEqual(task);
  });

  it("reads tasks", async () => {
    await composable.create({ title: "Task 1", status: "todo" });
    const tasks = await composable.read();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it("reads one task", async () => {
    const task = await composable.create({ title: "Task 2", status: "todo" });
    const found = await composable.readOne(task.id);
    expect(found).toEqual(task);
  });

  it("updates a task", async () => {
    const task = await composable.create({ title: "Task 3", status: "todo" });
    const updated = await composable.update({ title: "Updated Task" }, task.id);
    expect(updated?.title).toBe("Updated Task");
  });

  it("removes a task", async () => {
    const task = await composable.create({ title: "Task 4", status: "todo" });
    await composable.remove(task.id);
    expect(
      composable.items.value.find((t) => t.id === task.id),
    ).toBeUndefined();
  });
});
