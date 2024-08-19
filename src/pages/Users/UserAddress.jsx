import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchAddresses } from '../../redux/slices/addressSlice';
import { createAddress, getLocationData } from '../../api/address';
import { selectAuthToken } from '../../redux/slices/auth'; // Import selector untuk mendapatkan token

const UserAddress = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken); // Ambil token dari state auth
  const { addresses = [], status, error } = useSelector((state) => state.address); // Add default empty array
  const [newAddress, setNewAddress] = useState({
    nama: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    detail: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [kelurahans, setKelurahans] = useState([]);

  useEffect(() => {
    dispatch(fetchAddresses());
    fetchProvinces();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch addresses!',
      });
    }
  }, [error]);

  const fetchProvinces = async () => {
    try {
      const response = await getLocationData('provinsi');
      setProvinces(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch provinces!',
      });
    }
  };

  const handleProvinceChange = async (provinsiId) => {
    try {
      const response = await getLocationData('kabupaten', provinsiId);
      setRegencies(response.data);
      setDistricts([]);
      setKelurahans([]);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch regencies!',
      });
    }
  };

  const handleRegencyChange = async (kabupatenId) => {
    try {
      const response = await getLocationData('kecamatan', kabupatenId);
      setDistricts(response.data);
      setKelurahans([]);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch districts!',
      });
    }
  };

  const handleKecamatanChange = async (kecamatanId) => {
    try {
      const response = await getLocationData('kelurahan', kecamatanId);
      setKelurahans(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch kelurahans!',
      });
    }
  };

  const handleAddAddress = async () => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'No token found. Please log in again.',
      });
      return;
    }

    try {
      await createAddress(newAddress, token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Address added successfully!',
      });
      setNewAddress({
        nama: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        detail: '',
      });
      dispatch(fetchAddresses()); // Refresh address list
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add address!',
      });
    }
  };

  return (
    <div className='container'>
      <h3>User Address</h3>
      {addresses && addresses.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama Tempat</th>
              <th scope="col">Kelurahan</th>
              <th scope="col">Kecamatan</th>
              <th scope="col">Kabupaten</th>
              <th scope="col">Provinsi</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{address.nama}</td>
                <td>{address.kelurahan}</td>
                <td>{address.kecamatan}</td>
                <td>{address.kabupaten}</td>
                <td>{address.provinsi}</td>
                <td>{address.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No addresses found.</p>
      )}
      <h4>Add New Address</h4>
      <div className='card p-5 mx-auto' style={{ width: '30rem' }}>
        <div className="address-form">
          <div className="form-group">
            <label htmlFor="namaTempat">Nama Tempat:</label>
            <input
              type="text"
              id="namaTempat"
              className="form-control"
              value={newAddress.nama}
              onChange={(e) => setNewAddress({ ...newAddress, nama: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="provinsi">Provinsi:</label>
            <select
              id="provinsi"
              className="form-control"
              value={newAddress.provinsi}
              onChange={(e) => {
                setNewAddress({ ...newAddress, provinsi: e.target.value });
                handleProvinceChange(e.target.value);
              }}
            >
              <option value="" disabled>Pilih Provinsi</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>{province.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kabupaten">Kabupaten/Kota:</label>
            <select
              id="kabupaten"
              className="form-control"
              value={newAddress.kabupaten}
              onChange={(e) => {
                setNewAddress({ ...newAddress, kabupaten: e.target.value });
                handleRegencyChange(e.target.value);
              }}
            >
              <option value="" disabled>Pilih Kabupaten/Kota</option>
              {regencies.map((regency) => (
                <option key={regency.id} value={regency.id}>{regency.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kecamatan">Kecamatan:</label>
            <select
              id="kecamatan"
              className="form-control"
              value={newAddress.kecamatan}
              onChange={(e) => {
                setNewAddress({ ...newAddress, kecamatan: e.target.value });
                handleKecamatanChange(e.target.value);
              }}
            >
              <option value="" disabled>Pilih Kecamatan</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kelurahan">Kelurahan:</label>
            <select
              id="kelurahan"
              className="form-control"
              value={newAddress.kelurahan}
              onChange={(e) => setNewAddress({ ...newAddress, kelurahan: e.target.value })}
            >
              <option value="" disabled>Pilih Kelurahan</option>
              {kelurahans.map((kelurahan) => (
                <option key={kelurahan.id} value={kelurahan.id}>{kelurahan.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="detail">Detail:</label>
            <textarea
              id="detail"
              className="form-control"
              value={newAddress.detail}
              onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
            />
          </div>

          <button className="btn mt-3 btn-primary" onClick={handleAddAddress}>Add Address</button>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
