# React Tanstack Query Guide

Youtube Tutorial Link:
https://www.youtube.com/watch?v=r8Dg0KVnfMA

React Tankstack Query Documentation Link:
https://tanstack.com/query/v4/docs/react/overview

## Installation

- Install Tanstack Query for React:

   `npm install @tanstack/react-query`

- Install Dev Tools 

   `npm install @tanstack/react-query-devtools`

## Configure React Query

- In main.jsx or index.jsx, do the following:
   - Import { QueryClient, QueryClientProvider } from '@tanstack/react-query'.
   - Wrap <App /> with the <QueryClientProvider> component and pass QueryClient instance to client prop.
   