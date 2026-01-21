<template>
  <div>
    <ModalEditCreateSkeleton :title="title" v-if="loading" />

    <form
      v-else
      @submit.prevent="onSubmit"
      @reset="modalStore.closeModal()"
      class="flex"
      aria-label="Create or Edit Form"
      v-focus-trap
    >
      <h2>{{ title }}</h2>

      <FormField
        label="Title"
        title="title"
        placeholder="Enter Title Here"
        field="input"
        :focus="true"
        v-model="form.title"
      />
      <div class="error" v-if="errors.title">{{ errors.title }}</div>

      <FormField
        label="Description"
        title="description"
        placeholder="Enter Description Here"
        field="area"
        :focus="false"
        v-model="form.description"
      />
      <div class="error" v-if="errors.description">
        {{ errors.description }}
      </div>

      <SelectField
        label="Priority"
        title="priority"
        :options="['Low', 'Medium', 'High']"
        v-model="form.priority"
      />

      <SelectField
        label="Status"
        title="status"
        :options="statusOptions"
        v-model="form.status"
      />
      <TagField
        label="Tags"
        placeholder="Press enter to add tag"
        v-model="form.tags"
      />
      <div class="flex end-btns">
        <FormBtn btn-label="Submit" type="submit" btn-type="button" />
        <FormBtn
          class="cancel"
          btn-label="Cancel"
          type="reset"
          btn-type="button"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const modalStore = useModalStore();
const { modalType, interactingId } = storeToRefs(modalStore);
const { task, loading } = useTask(interactingId.value);
const { handleError } = useHandleError();
const crud = useCrud();
const type = modalType.value;
const interacting = interactingId.value;
const { form, errors, statusOptions, isValid, toPayload } = useTaskForm(
  modalType,
  task,
);

const submitting = ref(false);

const title = computed(() =>
  modalType.value === "create" ? "Create New Task" : "Edit Task",
);

async function onSubmit() {
  if (!isValid.value) return;

  submitting.value = true;
  try {
    modalStore.closeModal();

    if (type === "create") {
      await crud.create(toPayload());
    } else if (type === "edit" && interacting) {
      await crud.update(toPayload(), interacting);
    }
  } catch (err) {
    handleError(err, "Could not save task.", "bad", type);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped lang="scss">
form {
  max-width: 500px;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  .end-btns {
    gap: 0.5rem;
  }
  .error {
    color: var(--destructive);
    font-size: 0.8rem;
  }
}
</style>
