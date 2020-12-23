import './CreateAnnouncement.css'
import React from "react";

export default function CreateAnnouncement({setModalState}) {
  return (
      <button onClick={() => setModalState('Create')} className='btn-create-announcement'>Add new announcement</button>
  );
}