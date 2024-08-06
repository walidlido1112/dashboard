import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // الحصول على التوكن
        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('http://localhost:5000/api/user/profile', { // تأكد من صحة المسار
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {error && <p>Error fetching profile: {error}</p>}
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          {/* عرض تفاصيل أخرى هنا */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
