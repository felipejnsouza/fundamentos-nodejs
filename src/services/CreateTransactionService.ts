import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'outcome'|'income';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    if(type == 'outcome') {
      if((this.transactionsRepository.getBalance().total - value) < 0){
      throw Error("You don´t have money enough!")}
    };

    const transaction = this.transactionsRepository.create({title, type, value});

    return transaction;
  }
}

export default CreateTransactionService;
