import UserSearch from "@/components/actions/search/UserSearch";

import FriendRequests from "@/components/FriendRequests";

const CommunautyPage = async () => {
  return (
    <div>
      <h1 className="m-10 p-8 text-3xl border rounded-md">Communauté</h1>
      <div className="m-6 grid gap-5">
        <h4>Rechercher un contact</h4>
        <UserSearch />
      </div>
      <div className="m-10">
        <h4>Demandes en attente</h4>
        <FriendRequests />
      </div>
    </div>
  );
};

export default CommunautyPage;
