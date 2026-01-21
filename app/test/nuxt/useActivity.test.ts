import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { defineComponent } from "vue";

// Mocks for dependencies
vi.stubGlobal("crypto", {
  randomUUID: () => "mock-uuid",
});

global.localStorage = {
  getItem: vi.fn(() => "user-1"),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
} as any;

describe("useActivity", () => {
  let composable: ReturnType<typeof useActivity>;
  const createTestComponent = () => {
    return defineComponent({
      setup() {
        const activity = useActivity();
        return { activity };
      },
      template: "<div></div>",
    });
  };
  beforeEach(() => {
    const TestComp = createTestComponent();
    const wrapper = mount(TestComp);
    composable = wrapper.vm.activity;
    composable.activities.value = [];
  });

  it("adds an activity", () => {
    const activity = composable.addActivity({
      userId: "user-1",
      taskId: "task-1",
      action: "task:create",
    });
    expect(composable.activities.value[0]).toEqual(activity);
  });

  it("checks if task is recently edited by other", () => {
    composable.addActivity({
      userId: "user-2",
      taskId: "task-1",
      action: "task:editing",
      time: new Date().toISOString(),
    });
    expect(composable.isTaskRecentlyEditedByOther("task-1")).toBe(true);
  });

  it("blocks if task is edited by other", () => {
    composable.addActivity({
      userId: "user-2",
      taskId: "task-1",
      action: "task:editing",
      time: new Date().toISOString(),
    });
    expect(composable.checkAndBlockIfEdited("task-1")).toBe(false);
  });
});
