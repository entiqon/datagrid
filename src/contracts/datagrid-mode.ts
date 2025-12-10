/**
 * Determines how the DataGrid obtains and manages its data.
 *
 * - "client": All data is already loaded in memory. Pagination, filtering,
 *   and sorting are performed on the client.
 * - "server": Data is fetched from a remote endpoint. Pagination, filtering,
 *   and sorting are delegated to the server.
 */
export type DataGridMode = 'client' | 'server';
