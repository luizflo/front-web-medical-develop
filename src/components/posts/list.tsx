import React from "react";
import { useTranslate, useMany } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

// import { ICategory, IPost } from "src/interfaces";

export const PostList: React.FC = () => {
  // const t = useTranslate();

  // const { dataGridProps } = useDataGrid<IPost>();

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   // queryOptions: {
  //   //   enabled: categoryIds.length > 0,
  //   // },
  // });

  // const columns = React.useMemo<GridColumns<IPost>>(
  //   () => [
  //     {
  //       field: "id",
  //       headerName: t("posts.fields.id"),
  //       type: "number",
  //       width: 50,
  //     },
  //     {
  //       field: "title",
  //       headerName: t("posts.fields.title"),
  //       minWidth: 400,
  //       flex: 1,
  //     },
  //     {
  //       field: "category.id",
  //       headerName: t("posts.fields.category.title"),
  //       type: "number",
  //       headerAlign: "left",
  //       align: "left",
  //       minWidth: 250,
  //       flex: 0.5,
  //       renderCell: function render({ row }) {
  //         if (isLoading) {
  //           return "Loading...";
  //         }

  //         const category = categoriesData?.data.find(
  //           (item) => item.id === row.category.id
  //         );
  //         return category?.title;
  //       },
  //     },
  //     {
  //       field: "status",
  //       headerName: t("posts.fields.status.title"),
  //       minWidth: 120,
  //       flex: 0.3,
  //     },
  //     {
  //       field: "actions",
  //       type: "actions",
  //       headerName: t("table.actions"),
  //       renderCell: function render({ row }) {
  //         return (
  //           <Stack direction="row" spacing={1}>
  //             <EditButton size="small" hideText recordItemId={row.id} />
  //             <DeleteButton size="small" hideText recordItemId={row.id} />
  //           </Stack>
  //         );
  //       },
  //       align: "center",
  //       headerAlign: "center",
  //       minWidth: 80,
  //     },
  //   ],
  //   [t, categoriesData, isLoading]
  // );

  return (
    <List>
      {/* <DataGrid {...dataGridProps} columns={columns} autoHeight /> */}
      <div />

    </List>
  );
};
