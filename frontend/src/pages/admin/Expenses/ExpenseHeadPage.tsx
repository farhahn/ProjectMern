import React, { Component } from 'react';
import { FaSearch, FaCheck, FaTimes, FaEdit, FaTrash, FaSave, FaUndo } from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background: #f5f7fb;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  margin-bottom: 20px;

  input, button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #45a049;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 8px 12px 8px 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: ${props => props.editing ? '1fr 1fr auto auto' : '1fr 2fr auto auto'};
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s ease;
  gap: 10px;

  &:hover {
    background: #f9f9f9;
  }

  input {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }

  svg {
    margin-left: 10px;
    cursor: pointer;
    color: #666;
    transition: color 0.2s ease;
    
    &:hover {
      color: #333;
    }
  }
`;

const StatusIndicator = styled.span`
  color: ${props => props.active ? '#4CAF50' : '#f44336'};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Pagination = styled.div`
  text-align: center;
  color: #666;
  margin-top: 15px;
  font-size: 0.9em;
`;

class ExpenseHeadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseHeads: [
        { id: 1, name: 'Stationery Purchase', description: 'Office stationery items', active: true },
        { id: 2, name: 'Electricity Bill', description: 'Monthly electricity charges', active: true },
        { id: 3, name: 'Telephone Bill', description: 'Mobile and landline bills', active: false },
        { id: 4, name: 'Miscellaneous', description: 'Other expenses', active: true },
        { id: 5, name: 'Flower', description: 'Floral decorations', active: false },
      ],
      searchQuery: '',
      newHead: '',
      newDescription: '',
      editingId: null,
      editName: '',
      editDescription: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newHead, newDescription, expenseHeads } = this.state;
    
    if (!newHead.trim() || !newDescription.trim()) return;
    
    this.setState({
      expenseHeads: [...expenseHeads, {
        id: Date.now(),
        name: newHead.trim(),
        description: newDescription.trim(),
        active: true
      }],
      newHead: '',
      newDescription: ''
    });
  };

  toggleStatus = (id) => {
    this.setState(prevState => ({
      expenseHeads: prevState.expenseHeads.map(head => 
        head.id === id ? { ...head, active: !head.active } : head
      )
    }));
  };

  deleteHead = (id) => {
    this.setState(prevState => ({
      expenseHeads: prevState.expenseHeads.filter(head => head.id !== id)
    }));
  };

  startEditing = (head) => {
    this.setState({
      editingId: head.id,
      editName: head.name,
      editDescription: head.description
    });
  };

  cancelEditing = () => {
    this.setState({
      editingId: null,
      editName: '',
      editDescription: ''
    });
  };

  saveEdit = () => {
    this.setState(prevState => ({
      expenseHeads: prevState.expenseHeads.map(head => 
        head.id === prevState.editingId ? {
          ...head,
          name: prevState.editName.trim(),
          description: prevState.editDescription.trim()
        } : head
      ),
      editingId: null,
      editName: '',
      editDescription: ''
    }));
  };

  get filteredHeads() {
    const { expenseHeads, searchQuery } = this.state;
    const query = searchQuery.toLowerCase();
    
    return expenseHeads.filter(head =>
      head.name.toLowerCase().includes(query) ||
      head.description.toLowerCase().includes(query)
    );
  }

  render() {
    const { newHead, newDescription, searchQuery, editingId, editName, editDescription } = this.state;

    return (
      <Container>
        <Section>
          <h2>Add Expense Head</h2>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Expense Head"
              value={newHead}
              onChange={(e) => this.setState({ newHead: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => this.setState({ newDescription: e.target.value })}
              required
            />
            <button type="submit">Save</button>
          </Form>
        </Section>

        <Section>
          <h2>Expense Head List</h2>
          <SearchContainer>
            <FaSearch />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
          </SearchContainer>

          {this.filteredHeads.map(head => (
            <ListItem key={head.id} editing={editingId === head.id}>
              {editingId === head.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => this.setState({ editName: e.target.value })}
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => this.setState({ editDescription: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <div>{head.name}</div>
                  <div>{head.description}</div>
                </>
              )}
              
              <StatusIndicator 
                active={head.active} 
                onClick={() => this.toggleStatus(head.id)}
              >
                {head.active ? <FaCheck /> : <FaTimes />}
                {head.active ? 'Active' : 'Inactive'}
              </StatusIndicator>

              <ActionContainer>
                {editingId === head.id ? (
                  <>
                    <FaSave 
                      onClick={this.saveEdit}
                      title="Save"
                      style={{ color: '#4CAF50' }}
                    />
                    <FaUndo 
                      onClick={this.cancelEditing}
                      title="Cancel"
                      style={{ color: '#f44336' }}
                    />
                  </>
                ) : (
                  <>
                    <FaEdit 
                      onClick={() => this.startEditing(head)}
                      title="Edit"
                    />
                    <FaTrash 
                      onClick={() => this.deleteHead(head.id)} 
                      title="Delete"
                    />
                  </>
                )}
              </ActionContainer>
            </ListItem>
          ))}

          <Pagination>
            Showing {this.filteredHeads.length} of {this.state.expenseHeads.length} records
          </Pagination>
        </Section>
      </Container>
    );
  }
}

export default ExpenseHeadPage;