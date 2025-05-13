import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return;
  }

  const updateJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob)
    });
    return;
  } 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout />}>
        <Route index element={ <HomePage /> } />
        <Route path='/jobs' element={ <JobsPage /> } />
        <Route path='/jobs/:id' element={ <JobPage deleteJob={deleteJob} /> } loader={jobLoader} />
        <Route path='/add-job' element={ <AddJobPage addJobSubmit={addJob} /> } />
        <Route path='*' element={ <NotFoundPage /> } />
        <Route path='/edit-job/:id' element={ <EditJobPage updateJobSubmit={updateJob} /> } loader={jobLoader} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
