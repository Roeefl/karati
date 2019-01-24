import React from 'react';
import { connect } from 'react-redux';
import { fetchMyProposals, acceptProposal, loadChat, setCurrentComponent } from '../../actions';
import * as errors from '../shared/errors';
import Message from '../shared/Message';
import Spinner from '../shared/Spinner';
import ProposalCard from './ProposalCard';
import ProposalFilter from './ProposalFilter';
import ProposalChat from './ProposalChat';
import './MyProposals.css';

class MyProposals extends React.Component {
    state = {
        selectedProposal: null
    };

    componentDidMount() {
        this.props.setCurrentComponent({
            primary: 'My Proposals',
            secondary: 'View proposals that you made to or received from other users',
            icon: 'handshake outline'
        });

        this.props.fetchMyProposals();
    }

    onAccept = (proposal) => {
        this.props.acceptProposal(proposal.proposalId);
    }

    onCardClick = (proposal) => {
        this.setState({ selectedProposal: proposal });
        this.props.loadChat(proposal);
    }

    renderContent() {
        if (!this.props.myProposals) {
            return (
                <Spinner message="Fetching Proposals..."/>
            );
        };

        if (this.props.myProposals.error) {
            return (
                <Message 
                    color='red'
                    lines={[
                        this.props.myProposals.error
                    ]} />
            );
        };

        if (this.props.myProposals.length <= 0 ) {
            return (
                <Message 
                    color='red'
                    lines={[
                        errors.NO_PROPOSALS
                    ]} />
            );
        };

        const proposalCards = this.props.myProposals.map( proposal => {
            return (
                <ProposalCard proposal={proposal} key={proposal.proposalId} onAccept={this.onAccept} onCardClick={this.onCardClick} />
            );
        });

        return (
            <div className="ui grid proposals-grid">
                <div className="five wide column filter-col">

                    <div className="proposals-container">
                        <div className="proposal-filters">
                            <ProposalFilter />
                            <ProposalFilter />
                        </div>

                        <div className="proposal-cards">
                            {proposalCards}
                        </div>
                    </div>
                    
                </div>
                
                <div className="eleven wide column chat-col">
                    <ProposalChat
                        proposal={this.state.selectedProposal}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="my-proposals ui raised container">
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData, 
        myProposals: state.myProposals
    }
};

export default connect(
    mapStateToProps,
    { fetchMyProposals, acceptProposal, loadChat, setCurrentComponent }
)(MyProposals);