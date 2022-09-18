import styled from "@emotion/styled";
import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import Button from "../button/button";
import Input from "../input";
import Modal from "../modal";
import { FormProps } from "./report-form.hooks";
import { Form } from "./styled";
import { FormsCollection } from "./types";

interface ThirdStepProps extends FormProps {
  isPending: boolean;
  isSent: boolean;
}

const ThirdStep: FunctionComponent<ThirdStepProps> = ({
  control,
  isPending,
  isSent,
  onContinue,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "thirdStep.expenseReport",
    shouldUnregister: true,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const closeAddExpense = useCallback(() => setOpenAddExpenseModal(false), []);

  return (
    <>
      <Form as="div">
        <h2 id="expense-report-header" style={{ marginBottom: 32 }}>
          Expense report
        </h2>

        {!fields.length && <p>Expense list is empty</p>}
        {fields.map((field, index) => (
          <RowRenderer
            key={field.id}
            {...field}
            index={index}
            remove={remove}
            update={update}
          />
        ))}

        <CustomButton
          variant="outlined"
          onClick={() => setOpenAddExpenseModal(true)}
          type="button"
        >
          Add another expense
        </CustomButton>

        <Button
          size="big"
          style={{ marginTop: 32 }}
          disabled={isPending || isSent}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onContinue();
          }}
        >
          {isPending && "Sending"}
          {isSent && "Success"}
          {!isSent && !isPending && "Submit"}
        </Button>
      </Form>

      <Modal open={openAddExpenseModal} closeModal={closeAddExpense}>
        <EditOrCreateItemModal
          onSubmit={(item) => {
            append(item);
            setOpenAddExpenseModal(false);
          }}
          defaultValues={{ name: "", price: 0 }}
          mode="Add"
          close={closeAddExpense}
        />
      </Modal>
    </>
  );
};

const DeleteItemModal = ({
  close,
  onSubmit,
  name,
}: {
  onSubmit: () => void;
  close: () => void;
  name: string;
}) => {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 16,
          minWidth: 280,
          display: "grid",
          gap: 16,
        }}
      >
        <h2 style={{ marginBottom: 16 }} id="modal-header">
          Do you want to delete "{name}" item?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 32,
          }}
        >
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onSubmit();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const EditOrCreateItemModal = ({
  close,
  onSubmit,
  mode,
  defaultValues,
}: {
  close: () => void;
  onSubmit: (item: { name: string; price: number }) => void;
  mode: "Edit" | "Add";
  defaultValues?: { name: string; price: number };
}) => {
  const { handleSubmit, control } = useForm<{ name: string; price: number }>({
    defaultValues,
  });
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 16,
          minWidth: 280,
          display: "grid",
          gap: 16,
        }}
      >
        <h2 style={{ marginBottom: 16 }} id="modal-header">
          {mode} expense item
        </h2>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="name"
              label="Name"
              name="Label"
              autoComplete="off"
              required={true}
              errorMessage={
                error && { message: error.message ?? "", errorName: error.type }
              }
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          rules={{
            required: "Price is required",
            validate: (value) =>
              isNaN(value) ? "Price is required" : undefined,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              id="price"
              type="number"
              label="Price"
              step="0.01"
              name="Price"
              autoComplete="off"
              required={true}
              errorMessage={
                error && { message: error.message ?? "", errorName: error.type }
              }
            />
          )}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 32,
          }}
        >
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            {mode}
          </Button>
        </div>
      </div>
    </div>
  );
};

const RowRenderer = ({
  id,
  price,
  name,
  index,
  remove,
  update,
}: FieldArrayWithId<FormsCollection, "thirdStep.expenseReport", "id"> & {
  index: number;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<FormsCollection, "thirdStep.expenseReport">;
}) => {
  const [editOpened, setEditOpened] = useState(false);
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);

  const closeEditModal = useCallback(() => {
    console.log("CLOSE");
    setEditOpened(false);
  }, []);

  const closeDeleteModal = useCallback(
    () => setOpenDeleteExpenseModal(false),
    []
  );

  const onEditSubmit = useCallback(
    (item: { name: string; price: number }) => {
      update(index, item);
    },
    [index, update]
  );

  const onDeleteSubmit = useCallback(() => {
    remove(index);
    setOpenDeleteExpenseModal(false);
  }, [remove, index]);

  return (
    <>
      <RowContainer>
        <StyledPrice value={price} />
        <StyledName name={name} />
        <Button
          onClick={() => setOpenDeleteExpenseModal(true)}
          type="button"
          aria-label={`Delete expense ${name}`}
          id={`delete-${index}`}
          variant="outlined"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={() => setEditOpened(true)}
          aria-label={`Edit expense ${name}`}
          id={`edit-${index}`}
        >
          Edit
        </Button>
      </RowContainer>
      <Modal open={editOpened} closeModal={closeEditModal} name="EDIT">
        <EditOrCreateItemModal
          onSubmit={onEditSubmit}
          mode="Edit"
          close={closeEditModal}
          defaultValues={{ name, price }}
        />
      </Modal>
      <Modal
        open={openDeleteExpenseModal}
        closeModal={closeDeleteModal}
        name="DELETE"
      >
        <DeleteItemModal
          name={name}
          onSubmit={onDeleteSubmit}
          close={closeDeleteModal}
        />
      </Modal>
    </>
  );
};

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr min-content min-content;
  width: 100%;
  gap: 12px;
  padding-bottom: 24px;
`;
const StyledPrice = ({ value }: { value: number }) => (
  <span style={{ fontWeight: 700, minWidth: 60 }}>{value} €</span>
);

const StyledName = ({ name }: { name: string }) => (
  <span style={{ textAlign: "left" }}>{name}</span>
);

const CustomButton = styled(Button)`
  justify-self: flex-end;
  width: auto;
  padding-left: 4;
  padding-right: 4;
  padding-bottom: 4;
  font-weight: 400;
`;

export default ThirdStep;
