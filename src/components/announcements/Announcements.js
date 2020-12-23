import React, {useState} from 'react';
import './Announcements.css'
import SearchPanel from "../search-panel/SearchPanel";
import DontCreate from "../dont-create/DontCreate";
import ModalCreateAnnouncement from "../modal-create-announcement/ModalCreateAnnouncement";
import AllAnnouncements from "../all-announcements/AllAnnouncements";

export default function Announcements() {

  const myArr = [
    {id: 1, title: "top 1 similar", description: "Сушильная  машина Siemens 7 kg mod.IQ7000 производство  Германия\n" +
          "Магазины Техника б/у ZNIGHKA. Техника проходит полную диагностику, санитарную обработку, в отличном рабочем состоянии, с ГАРАНТИЕЙ на проверку.\n" +
          "Есть возможность обмена.\n" +
          "Доставка по городу и области, занос товара.\n" +
          "\n" +
          "Наши магазины находятся по адресам:\n" +
          "Ст. метро Академика Павлова ул.Васыля Стуса 4а (бывшая ул. Механизаторская,район Салтовка)\n" +
          "Ст. метро Тракторный завод ул.Мира 18 (район ХТЗ)\n" +
          "Ст. метро Южный вокзал ул.Котляра 20 (бывшая ул. Красноармейская, район ЮЖД)"},
    {id: 2, title: "top 2 similar", description: "Кому интересно - звоните.\n" +
          "Посудомойка Electrolux reallife xxl не заливает воду. Проблема с платой управления. "},
    {id: 3, title: "top 3 similar", description: "Приставки Nintendo Switch Lite прошитые чипом SX Lite в прекрасном состоянии\n" +
          "\n" +
          "Приставки б\\у, состояние почти как новое.\n" +
          "\n" +
          "Цвета разные. Наличие цветов уточняйте\n" +
          "\n" +
          "В комплекте приставка и блок питания для зарядки. В приставке карта на 16 Гб с эмунандом и играми для проверки\n" +
          "\n" +
          "Можно запускать оригинальную прошивку для игры онлайн а купленные игры. Можно качать игры прямо с приставки по wifi без доступа к ПК\n" +
          "\n" +
          "Гарантия, поддержка\n" +
          "\n" +
          "http://sx.customfw.xyz/usage - инструкции\n" +
          "https://youtu.be/nOaCgKienho\n" +
          "\n" +
          "Так же возможна прошивка вашей приставки "},
  ]

  const [announcements, setAnnouncements] = useState(myArr);
  const [showArr, setShowArr] = useState([]);
  const [modal, setModalState] = useState(null);
  const [modalEdit, setModalEditState] = useState(false);

  const addAnnouncementToArr = (title, description) => {
    const arr = JSON.parse(JSON.stringify(announcements))
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    let id = null;

    if (modalEdit) {
      const chosen = arr.find(value => value.id === modalEdit.announcement.id)
      const editDate = {date, month, year, hours, minutes}

      if (title) {
        chosen.title = title
      }
      if (description) {
        chosen.description = description
      }

      chosen.editDate = editDate
    } else {
      (announcements.length > 0)
          ? id = announcements[announcements.length - 1].id + 1
          : id = 1
      const createDate = {date, month, year, hours, minutes}
      arr.push({id, title, description, createDate})
    }

    setAnnouncements(arr)
    setModalState(false)
    setModalEditState(false)
  }

  const editAnnouncement = (announcement) => {
    setModalEditState({announcement})
    setModalState('Edit')
  }

  const closeModal = () => {
    setModalEditState(false)
    setModalState(null)
  }

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(value => value.id !== id))
  }

  const findAnnouncements = (newSearchValue, searchValue, setHintState) => {
    let arr = []
    searchValue
        ? arr = announcements.filter(value => value.title.includes(`${searchValue}`))
        : arr = announcements.filter(value => value.title.includes(`${newSearchValue}`))
    setShowArr(arr)
    setHintState(false)
  }

  return (

      <div className='announcements-wrapper'>
        <h2 className='text-announcements'>Announcements</h2>
        <SearchPanel announcements={announcements}
                     findAnnouncements={findAnnouncements}
                     setShowArr={setShowArr} showArr={showArr}/>
        {
          announcements.length > 0
              ? showArr.length === 0
                  ? <AllAnnouncements
                      editAnnouncement={editAnnouncement}
                      announcements={announcements}
                      setModalState={setModalState}
                      deleteAnnouncement={deleteAnnouncement}/>
                  : <AllAnnouncements
                      editAnnouncement={editAnnouncement}
                      announcements={showArr}
                      setModalState={setModalState}
                      deleteAnnouncement={deleteAnnouncement}/>
              : <DontCreate setModalState={setModalState}/>
        }

        {modal && <ModalCreateAnnouncement
            modalType={modal}
            modalEdit={modalEdit}
            closeModal={closeModal}
            setAnnouncements={setAnnouncements}
            addAnnouncementToArr={addAnnouncementToArr}
        />}
      </div>
  );
}