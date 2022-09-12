import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
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

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onContinue();
        }}
      >
        <h2 style={{ marginBottom: 32 }}>Expense report</h2>

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

        <Button
          variant="outlined"
          onClick={() => setOpenAddExpenseModal(true)}
          type="button"
          style={{
            justifySelf: "flex-end",
            width: "auto",
            border: "none",
            borderBottom: "1px solid",
            paddingLeft: 4,
            paddingRight: 4,
            paddingBottom: 4,
            fontWeight: 400,
          }}
        >
          Add another expense
        </Button>

        <Button
          size="big"
          style={{ marginTop: 32 }}
          disabled={isPending || isSent}
        >
          {isPending && "Sending"}
          {isSent && "Success"}
          {!isSent && !isPending && "Submit"}
        </Button>
      </Form>

      <Modal
        open={openAddExpenseModal}
        closeModal={() => setOpenAddExpenseModal(false)}
      >
        <EditOrCreateItemModal
          onSubmit={(item) => {
            append(item);
            setOpenAddExpenseModal(false);
          }}
          mode="Add"
          close={() => setOpenAddExpenseModal(false)}
        />
      </Modal>
    </>
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
      <form
        style={{
          backgroundColor: "white",
          padding: 16,
          minWidth: 280,
          display: "grid",
          gap: 16,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 style={{ marginBottom: 16 }}>{mode} expense item</h2>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="name"
              label="Name"
              name="Label"
              errorMessage={
                error && { message: error.message ?? "", errorName: error.type }
              }
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              id="price"
              type="number"
              label="Price"
              step="0.01"
              name="Price"
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
          <Button type="submit">{mode}</Button>
        </div>
      </form>
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
  return (
    <>
      <RowContainer>
        <StyledPrice value={price} />
        <StyledName name={name} />
        <button
          onClick={() => remove(index)}
          type="button"
          aria-label={`Delete expense ${name}`}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => setEditOpened(true)}
          aria-label={`Edit expense ${name}`}
        >
          Edit
        </button>
      </RowContainer>
      {editOpened && (
        <Modal open={editOpened} closeModal={() => setEditOpened(false)}>
          <EditOrCreateItemModal
            onSubmit={(item) => {
              update(index, item);
              setEditOpened(false);
            }}
            mode="Edit"
            close={() => setEditOpened(false)}
            defaultValues={{ name, price }}
          />
        </Modal>
      )}
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

export default ThirdStep;
