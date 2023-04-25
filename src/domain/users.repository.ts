import CreateUserBody from 'src/users/create-user-body';
import UserResponseDTO from 'src/users/user-response.dto';
import { Paginated } from 'src/utils/paginated';

export default interface UsersRepository {
  create(data: CreateUserBody);
  findById(id: string);
  index(paginated: Paginated<UserResponseDTO>);
}
