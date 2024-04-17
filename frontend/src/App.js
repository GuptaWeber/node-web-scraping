import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  AlertDialog,
} from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [companies, setCompanies] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch(
        `http://localhost:5001/clients?q=${search}&page=${page}`
      );
      const data = await response.json();
      setCompanies(data.companies);
    };

    fetchCompanies();
  }, [search, page]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/clients/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        const updatedCompanies = companies.filter(
          (company) => company.id !== id
        );

        toast.success("Company deleted successfully");
        setCompanies(updatedCompanies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-4">
      <div className="my-4  flex gap-2">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search clients by name, cin or email"
          className="border border-gray-300 p-2 rounded-lg w-2/3"
        />
        <Link to="/add-client">
          <Button>Add New Client</Button>
        </Link>
      </div>

      <div className="companies flex gap-2 flex-wrap">
        {companies && companies.length > 0 ? (
          companies.map((company) => (
            <Box className="w-1/3">
              <Card size="2" className="shadow">
                <Flex gap="4" align="center" justify={"between"}>
                  <Link
                    to={`/client-details/${company.id}`}
                    key={company.cin}
                    className="block "
                  >
                    <Flex gap="4">
                      <Avatar
                        size="4"
                        radius="full"
                        fallback={company.companyName[0]}
                        color="indigo"
                      />
                      <Box>
                        <Text as="div" weight="bold">
                          {company.companyName}
                        </Text>
                        <Text as="div" color="gray">
                          {company.cin}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                  <Flex gap="4">
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Cross1Icon width={"20"} height={"20"} color="red" />
                      </AlertDialog.Trigger>

                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete User</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure? Do you want to delete the user?
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              variant="solid"
                              color="red"
                              onClick={() => handleDeleteUser(company.id)}
                            >
                              Delete User
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          ))
        ) : (
          <p>No companies found</p>
        )}
      </div>

      <div className="pagination my-4 flex gap-2">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default App;
